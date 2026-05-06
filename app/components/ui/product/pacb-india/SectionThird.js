import React from "react";
import Style from './SectionThird.module.scss'

const SectionThird = ({
  heading = "",
  description = "",
  items = [],
  imageBase = "",
  gridBoxes,
  maxWd,
}) => {
  // Backwards compatible: if a page still passes gridBoxes, render those as-is.
  const useGridBoxes = Array.isArray(gridBoxes) ? gridBoxes : null;

  return (
    <section className={Style.section_third}>
      <div className={Style.wrapper}>
        <div className={Style.section_third_heading}>
          {heading ? <h2 className={maxWd} data-animation="opacity-up">{heading}</h2> : null}
          {description ? (
            <p className={Style.section_third_lead} data-animation="opacity-up">
              {description}
            </p>
          ) : null}
        </div>
        <div className={Style.section_third_grid}>
          {useGridBoxes
            ? useGridBoxes.map((box, index) => (
                <div key={index} className={Style.section_third_box} data-animation="opacity-up">
                  <div className={Style.section_third_icon}>
                    {box.icon ? <img src={box.icon} alt={box.title || ""} /> : null}
                  </div>
                  <p>{box.text || box.title}</p>
                </div>
              ))
            : Array.isArray(items) && items.map((item, index) => {
                const iconPath = item?.Icon || item?.Image || "";
                const iconSrc = iconPath ? `${imageBase}${iconPath}` : "";
                const title = item?.Title || "";

                return (
                  <div key={index} className={Style.section_third_box} data-animation="opacity-up">
                    <div className={Style.section_third_icon}>
                      {iconSrc ? <img src={iconSrc} alt={title} /> : null}
                    </div>
                    <p>{title}</p>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default SectionThird;
