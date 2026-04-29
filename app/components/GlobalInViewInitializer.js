'use client'

import useGlobalInView from '@/app/components/hooks/useGlobalInView'

export default function GlobalInViewInitializer() {
  useGlobalInView({ rootMargin: '-15%', threshold: 0.1 })
  return null
}


