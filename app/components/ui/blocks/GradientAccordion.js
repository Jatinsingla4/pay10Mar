"use client";

import { useEffect, useRef, useState } from "react";
import Style from "./GradientAccordion.module.scss";

/**
 * A vertical accordion with a left "base line" + animated gradient segment that
 * follows the active item height/position (adapted from `JourneySection` logic).
 */
const GradientAccordion = ({
  items = [],
  initialActiveIndex = 0,
  className = "",
}) => {
  const safeItems = Array.isArray(items) ? items : [];
  const [activeIndex, setActiveIndex] = useState(
    safeItems.length ? Math.min(Math.max(initialActiveIndex, 0), safeItems.length - 1) : -1
  );

  const itemRefs = useRef([]);
  const [gradientHeight, setGradientHeight] = useState(0);
  const [gradientTop, setGradientTop] = useState(0);

  useEffect(() => {
    if (activeIndex < 0) return;

    const updateGradient = () => {
      const activeItem = itemRefs.current[activeIndex];
      if (!activeItem) return;

      const itemsContainer = activeItem.parentElement;
      if (!itemsContainer) return;

      // Calculate top position by summing heights of previous items + container padding + gaps
      let topPosition = 0;

      const itemsComputedStyle = window.getComputedStyle(itemsContainer);
      const paddingTop = parseFloat(itemsComputedStyle.paddingTop) || 0;
      topPosition += paddingTop;

      for (let i = 0; i < activeIndex; i++) {
        const item = itemRefs.current[i];
        if (item) topPosition += item.offsetHeight;
      }

      const gapValue = itemsComputedStyle.gap || itemsComputedStyle.rowGap || "16px";
      const gap = parseFloat(gapValue) || 16;
      if (activeIndex > 0) topPosition += activeIndex * gap;

      // Measure full height of the active item including expanded content
      const descriptionEl = activeItem.querySelector('[class*="description"]');
      let height = 0;

      if (descriptionEl) {
        const originalMaxHeight = descriptionEl.style.maxHeight;
        const originalOverflow = descriptionEl.style.overflow;
        const originalDisplay = descriptionEl.style.display;

        descriptionEl.style.maxHeight = "none";
        descriptionEl.style.overflow = "visible";
        descriptionEl.style.display = "block";

        void descriptionEl.offsetHeight;
        void activeItem.offsetHeight;

        height = activeItem.scrollHeight;

        descriptionEl.style.maxHeight = originalMaxHeight;
        descriptionEl.style.overflow = originalOverflow;
        descriptionEl.style.display = originalDisplay || "";
      } else {
        height = activeItem.scrollHeight;
      }

      setGradientHeight(height);
      setGradientTop(topPosition);
    };

    // Defer to ensure DOM updates (animations, expanded content) are applied
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateGradient();
          setTimeout(updateGradient, 100);
          setTimeout(updateGradient, 500);
        });
      });
    }, 0);

    const handleResize = () => {
      requestAnimationFrame(() => {
        setTimeout(updateGradient, 100);
      });
    };

    let observer = null;
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const descriptionEl = activeItem.querySelector('[class*="description"]');
      if (descriptionEl) {
        observer = new MutationObserver(() => {
          requestAnimationFrame(() => updateGradient());
        });
        observer.observe(descriptionEl, {
          attributes: true,
          attributeFilter: ["style", "class"],
          childList: true,
          subtree: true,
        });
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [activeIndex]);

  const onItemClick = (index) => {
    setActiveIndex(index);
  };

  const onItemKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(index);
    }
  };

  if (!safeItems.length) return null;

  return (
    <div className={`${Style.accordion} ${className || ""}`}>
      <div className={Style.line}>
        <div
          className={Style.gradient}
          style={{ height: `${gradientHeight}px`, top: `${gradientTop}px` }}
          aria-hidden="true"
        />
      </div>

      <div className={Style.items}>
        {safeItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={item?.id || `${index}-${item?.title || "item"}`}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${Style.item} ${isActive ? Style.active : ""}`}
              onClick={() => onItemClick(index)}
              onKeyDown={(e) => onItemKeyDown(e, index)}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
            >
              <div className={Style.indicator} aria-hidden="true">
                <span className={Style.dash}>-</span>
                <span className={Style.plus}>+</span>
              </div>

              <div className={Style.content}>
                {item?.title ? <div className={Style.title}>{item.title}</div> : null}
                <div className={Style.description}>{item?.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradientAccordion;


