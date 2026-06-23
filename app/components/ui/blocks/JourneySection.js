"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Style from "./JourneySection.module.scss";

const JourneySection = ({
  journeyData = [],
  mode = "journey", // "journey" or "accordion"
  title,
  /** CMS-friendly alias for `title` (e.g. `section6.heading`) */
  heading,
  rightImage, // For accordion mode - fixed image path
  largeDescriptionText = false,
}) => {
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0);
  const [journeySwiper, setJourneySwiper] = useState(null);
  const timelineItemRefs = useRef([]);
  const [gradientHeight, setGradientHeight] = useState(0);
  const [gradientTop, setGradientTop] = useState(0);

  const isAccordionMode = mode === "accordion";

  // Calculate gradient height and position based on active item
  useEffect(() => {
    const updateGradient = () => {
      if (timelineItemRefs.current[activeJourneyIndex]) {
        const activeItem = timelineItemRefs.current[activeJourneyIndex];
        const timelineItems = activeItem.parentElement;

        if (timelineItems) {
          // Calculate top position by manually summing heights of previous items
          // This is the most reliable method as it doesn't depend on offsetParent or scroll position
          let topPosition = 0;

          // Get padding-top from timeline_items (accounts for desktop padding in accordion mode)
          const timelineItemsComputedStyle = window.getComputedStyle(timelineItems);
          const paddingTop = parseFloat(timelineItemsComputedStyle.paddingTop) || 0;

          // Add padding-top to account for content padding (only applies on desktop in accordion mode)
          topPosition += paddingTop;

          // Sum up heights of all items before the active one
          for (let i = 0; i < activeJourneyIndex; i++) {
            if (timelineItemRefs.current[i]) {
              const item = timelineItemRefs.current[i];
              // Get the actual rendered height of each item
              topPosition += item.offsetHeight;
            }
          }

          // Add gap spacing between items
          // Get computed gap value from CSS (defaults to 16px = 1rem)
          const computedStyle = window.getComputedStyle(timelineItems);
          const gapValue = computedStyle.gap || computedStyle.rowGap || '16px';
          const gap = parseFloat(gapValue) || 16;

          // Add gap for each space between items (n items = n-1 gaps)
          if (activeJourneyIndex > 0) {
            topPosition += activeJourneyIndex * gap;
          }

          // Get the description element to measure full content height
          const descriptionEl = activeItem.querySelector(
            '[class*="timeline_description"]'
          );

          let gradientHeight = 0;

          if (descriptionEl) {
            // Temporarily remove max-height and overflow constraints to get accurate full height
            const originalMaxHeight = descriptionEl.style.maxHeight;
            const originalOverflow = descriptionEl.style.overflow;
            const originalDisplay = descriptionEl.style.display;

            // Set to auto/visible to get full height
            descriptionEl.style.maxHeight = "none";
            descriptionEl.style.overflow = "visible";
            descriptionEl.style.display = "block";

            // Force reflow to ensure styles are applied
            void descriptionEl.offsetHeight;
            void activeItem.offsetHeight;

            // Measure the full height of the active item including all content
            gradientHeight = activeItem.scrollHeight;

            // Restore original styles
            descriptionEl.style.maxHeight = originalMaxHeight;
            descriptionEl.style.overflow = originalOverflow;
            descriptionEl.style.display = originalDisplay || "";
          } else {
            // Fallback: use scrollHeight if description not found
            gradientHeight = activeItem.scrollHeight;
          }

          setGradientHeight(gradientHeight);
          setGradientTop(topPosition);
        }
      }
    };

    // Update on mount and when active index changes
    // Use multiple delays to ensure DOM has fully updated and animations have settled
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // First update after initial render
          updateGradient();

          // Second update after animations have started (for height changes)
          setTimeout(() => {
            updateGradient();
          }, 100);

          // Final update after animations should be complete
          setTimeout(() => {
            updateGradient();
          }, 500);
        });
      });
    }, 0);

    // Update on window resize
    const handleResize = () => {
      requestAnimationFrame(() => {
        setTimeout(updateGradient, 100);
      });
    };

    // Observe changes to the active item's content to recalculate when description expands
    let observer = null;
    if (timelineItemRefs.current[activeJourneyIndex]) {
      const activeItem = timelineItemRefs.current[activeJourneyIndex];
      const descriptionEl = activeItem?.querySelector('[class*="timeline_description"]');

      if (descriptionEl) {
        observer = new MutationObserver(() => {
          requestAnimationFrame(() => {
            updateGradient();
          });
        });

        observer.observe(descriptionEl, {
          attributes: true,
          attributeFilter: ['style', 'class'],
          childList: true,
          subtree: true
        });
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activeJourneyIndex, isAccordionMode]);

  const handleItemClick = (index) => {
    setActiveJourneyIndex(index);
    if (!isAccordionMode && journeySwiper) {
      journeySwiper.slideTo(index);
    }
  };

  const displayTitle =
    title === false
      ? ""
      : (title != null && title !== "" ? title : heading) ||
        (isAccordionMode ? "" : "Our Journey So Far");

  return (
    <div
      className={`${Style.journey_section} ${isAccordionMode ? Style.accordion_mode : ""} ${
        largeDescriptionText ? Style.large_description_text : ""
      }`}
    >
      <div className={Style.wrapper}>
        <div className={Style.journey_container}>
          {/* Left Column - Timeline/Accordion */}
          <div className={Style.journey_timeline}>
            {displayTitle && (
              <h2 data-animation="opacity-up">{displayTitle}</h2>
            )}
            <div className={Style.timeline_wrapper} data-animation="opacity-up">
              <div className={Style.timeline_line}>
                <div
                  className={Style.timeline_gradient}
                  style={{
                    height: `${gradientHeight}px`,
                    top: `${gradientTop}px`,
                  }}
                />
              </div>
              <div className={Style.timeline_items}>
                {journeyData.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => (timelineItemRefs.current[index] = el)}
                    className={`${Style.timeline_item} ${
                      index === activeJourneyIndex ? Style.active : ""
                    }`}
                    onClick={() => handleItemClick(index)}
                  >
                    <div className={Style.timeline_indicator}>
                      <span className={Style.timeline_dash}>-</span>
                      <span className={Style.timeline_plus}>+</span>
                    </div>
                    <div className={Style.timeline_content}>
                      {!isAccordionMode && item.year && (
                        <div className={Style.timeline_year}>{item.year}</div>
                      )}
                      {item.title && (
                        <div className={Style.timeline_title}>
                          {item.title}
                        </div>
                      )}
                      {typeof item.description === "string" ? (
                        <div
                          className={Style.timeline_description}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      ) : (
                        <div className={Style.timeline_description}>
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual Carousel or Fixed Image */}
          {isAccordionMode ? (
            <div className={Style.journey_carousel} data-animation="opacity-up">
              <div className={Style.fixed_image_container}>
                <img
                  src={rightImage}
                  alt={displayTitle || "Features"}
                  className={Style.fixed_image}
                />
              </div>
            </div>
          ) : (
            <div className={Style.journey_carousel} data-animation="opacity-up">
              <Swiper
                modules={[Navigation, Pagination]}
                direction="vertical"
                spaceBetween={20}
                slidesPerView={1.15}
                centeredSlides={true}
                speed={800}
                touchRatio={1}
                resistance={true}
                resistanceRatio={0.85}
                onSwiper={setJourneySwiper}
                onSlideChange={(swiper) => {
                  setActiveJourneyIndex(swiper.activeIndex);
                }}
                className={Style.journey_swiper}
                breakpoints={{
                  768: {
                    slidesPerView: 1.25,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 1.2,
                    spaceBetween: 28,
                  },
                }}
              >
                {journeyData.map((item, index) => (
                  <SwiperSlide key={index} className={Style.journey_slide}>
                    <div
                      className={`${Style.journey_card} ${
                        index === activeJourneyIndex ? Style.active : ""
                      }`}
                    >
                      <div className={Style.journey_card_image}>
                        <img src={item.image} alt={item.title || item.year} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Dots */}
              <div className={Style.journey_dots}>
                {journeyData.map((_, index) => (
                  <button
                    key={index}
                    className={`${Style.journey_dot} ${
                      index === activeJourneyIndex ? Style.active : ""
                    }`}
                    onClick={() => {
                      setActiveJourneyIndex(index);
                      if (journeySwiper) {
                        journeySwiper.slideTo(index);
                      }
                    }}
                    aria-label={`Go to ${journeyData[index].year}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneySection;
