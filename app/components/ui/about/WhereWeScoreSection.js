import React from "react";
import Style from './WhereWeScore.module.scss'

const WhereWeScoreSection = ({
  section3Heading = "",
  cards = []
}) => {
  const boxesToRender = cards.map(c => ({
    icon: c.icon ? <img src={c.icon} alt={c.title} style={{width: 80, height: 80, objectFit: 'contain'}} /> : null,
    text: c.title
  }));

  return (
    <div className={Style.where_we_score_new}>
      {section3Heading && (
        <div className={Style.header_content}>
          <h2 data-animation="opacity">{section3Heading}</h2>
        </div>
      )}
      <div className={Style.score_container} data-animation="opacity">
        {boxesToRender.map((box, index) => (
          <div key={index} className={Style.box}>
            <span className={Style.box_icon}>
              {box.icon}
            </span>
            <p className={Style.box_text}>{box.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereWeScoreSection;
