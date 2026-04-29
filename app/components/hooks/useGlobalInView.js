'use client'

import { useEffect } from 'react'

// This hook attaches a single IntersectionObserver that watches every element
// with a `data-animation` attribute and toggles the `in-view` class when the
// element enters or leaves the viewport. It automatically observes elements
// that are added to the DOM later (e.g. after route changes or lazy loading)
// via a MutationObserver.
//
// Options (set as attributes on the animated element):
// - data-anim-offset: per-element rootMargin (e.g. "-15%")
// - data-anim-re: set to "true" to make the animation reversible
// - data-anim-delay: delay in milliseconds before adding `in-view` (default 0)
export default function useGlobalInView({ rootMargin = '-15%', threshold = 0.1 } = {}) {
  useEffect(() => {
    const selector = '[data-animation]'

    // Re-use observers for identical offsets so we don't create one per element.
    const observers = new Map()

    // Track pending timeouts per element so we can clear them when leaving
    // the viewport or when re-entering quickly.
    const pendingTimeoutByElement = new WeakMap()

    // Track whether a one-time animation already fired, to avoid re-triggering
    const hasTriggeredOnce = new WeakMap()

    const getObserver = (offset) => {
      if (observers.has(offset)) return observers.get(offset)

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            const el = entry.target
            const isReversible = el.getAttribute('data-anim-re') === 'true'
            const targetClass = el.getAttribute('data-anim-class') || 'in-view'

            // If leaving the viewport
            if (!entry.isIntersecting) {
              // Cancel any pending delayed add
              const pending = pendingTimeoutByElement.get(el)
              if (pending) {
                clearTimeout(pending)
                pendingTimeoutByElement.delete(el)
              }

              // Only reversible animations remove the class on leave
              if (isReversible) {
                el.classList.remove(targetClass)
              }
              return
            }

            // If it already triggered once and isn't reversible, do nothing
            if (!isReversible && hasTriggeredOnce.get(el)) {
              // Ensure it's unobserved to avoid extra callbacks
              obs.unobserve(el)
              return
            }

            // When entering the viewport
            const delayAttr = el.getAttribute('data-anim-delay')
            const delay = Number.parseInt(delayAttr || '0', 10) || 0

            const addClassNow = () => {
              el.classList.add(targetClass)
              if (!isReversible) {
                hasTriggeredOnce.set(el, true)
                obs.unobserve(el)
              }
            }

            // If there was a pending timeout from a previous quick in/out, clear it
            const existing = pendingTimeoutByElement.get(el)
            if (existing) {
              clearTimeout(existing)
            }

            if (delay > 0) {
              const id = setTimeout(() => {
                pendingTimeoutByElement.delete(el)
                addClassNow()
              }, delay)
              pendingTimeoutByElement.set(el, id)
            } else {
              addClassNow()
            }
          })
        },
        { rootMargin: offset, threshold }
      )

      observers.set(offset, observer)
      return observer
    }

    const observeElement = (el) => {
      const offsetAttr = el.getAttribute('data-anim-offset')
      const offset = offsetAttr ?? rootMargin
      const observer = getObserver(offset)
      observer.observe(el)
    }

    // Observe all current elements
    document.querySelectorAll(selector).forEach(observeElement)

    // Observe future elements added to the DOM
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return // Not an element

          const element = node
          if (element.matches(selector)) observeElement(element)

          element.querySelectorAll?.(selector).forEach(observeElement)
        })
      })
    })

    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      // Disconnect all observers we created
      observers.forEach((obs) => obs.disconnect())
      mo.disconnect()
    }
  }, [rootMargin, threshold])
}
