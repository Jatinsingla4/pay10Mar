import React from 'react'
import Style from './SimpleLayout.module.scss'
import TwoColLayout from './TwoColLayout'
import ReverseLayout from './ReverseLayout'

const SimpleLayout = ({ items = [], imageBase = "", startWithImageLeft = true, useBackgroundCircle = false }) => {
  const wrapperClass = useBackgroundCircle 
    ? `${Style.wrapper} ${Style.wrapperWithBgCircle}`
    : Style.wrapper;

  return (
    <>
        <section className={wrapperClass}>
            {Array.isArray(items) && items.map((item, index) => {
              if (!item) return null;
              // Alternate layout, with configurable starting side.
              // imageLeft is the "image on left" state for that row.
              const imageLeft = startWithImageLeft ? index % 2 === 0 : index % 2 === 1;

              // Only the 2nd row (index 1) has the circles layout.
              // When using background circle, disable circles in second section
              if (index === 1) {
                return (
                  <ReverseLayout
                    key={index}
                    item={item}
                    imageBase={imageBase}
                    imageLeft={imageLeft}
                    withCircles={!useBackgroundCircle}
                  />
                );
              }

              // All other rows use the same TwoCol layout, just reversed when needed.
              return (
                <TwoColLayout
                  key={index}
                  item={item}
                  imageBase={imageBase}
                  reverse={!imageLeft}
                />
              );
            })}
        </section>
    </>
  )
}

export default SimpleLayout
