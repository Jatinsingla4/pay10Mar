import React from "react";
import Style from './WhereWeScore.module.scss'

const WhereWeScoreSection = ({
  section3,
  section3Heading
}) => {
  // Default gridArea values for boxes (maintains layout structure)
  const defaultGridAreas = [
    "volume",
    "frictionless",
    "support",
    "risk",
    "secure",
    "updates",
  ];

  // Default fallback boxes and their text
  const defaultBoxes = [
    {
      icon: <img src="/images/icons/payment.png" alt="Large payment volume capacity" />,
      text: (
        <>
          <h5>
            Large payment volume <br /> capacity
          </h5>
        </>
      ),
      gridArea: "volume",
    },
    {
      icon: <img src="/images/icons/frictionless.png" alt="Frictionless Payment Experience" />,
      text: (
        <>
          <h5>
            Frictionless Payment <br /> Experience
          </h5>
        </>
      ),
      gridArea: "frictionless",
    },
    {
      icon: <img src="/images/icons/service.png" alt="Far-reaching Customer Support" />,
      text: (
        <>
          <h5>
            Far-reaching Customer <br /> Support
          </h5>
        </>
      ),
      gridArea: "support",
    },
    {
      icon: <img src="/images/icons/report_box.png" alt="In-house risk management to monitor transactions" />,
      text: (
        <>
          <h5>
            In-house risk management to <br /> monitor transactions
          </h5>
        </>
      ),
      gridArea: "risk",
    },
    {
      icon: <img src="/images/icons/lock.png" alt="Simple, Secure, and reliable payment process" />,
      text: (
        <>
          <h5>
            Simple, Secure, and <br /> reliable payment process
          </h5>
        </>
      ),
      gridArea: "secure",
    },
    {
      icon: <img src="/images/icons/frame.png" alt="Frequent merchant updates" />,
      text: (
        <>
          <h5>
            Frequent merchant <br /> updates
          </h5>
        </>
      ),
      gridArea: "updates",
    },
  ];

  // Always use static fallback boxes
  const boxes = defaultBoxes;

  return (
    <div className={Style.where_we_score}>
      <h2 data-animation="opacity">{section3Heading}</h2>
      <div className={Style.score_container} data-animation="opacity">
        {boxes.map((box, index) => (
          <div
            key={index}
            className={Style.box}
            style={{ gridArea: box.gridArea }}
            data-grid-area={box.gridArea}
          >
            <span className={Style.box_icon}>{box.icon}</span>
            {box.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhereWeScoreSection;
