import React from "react";
import Style from './WhereWeScore.module.scss'

// Get process.env in client
const imageBase =
  typeof window !== "undefined" && process.env.NEXT_PUBLIC_IMAGE_URL
    ? process.env.NEXT_PUBLIC_IMAGE_URL
    : "";

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

  // Compose the boxes from API or fallback
  let boxes = defaultBoxes;
  if (
    typeof section3 === "object" &&
    Array.isArray(section3.list) &&
    section3.list.length > 0
  ) {
    boxes = section3.list.map((item, index) => {
      const gridArea = defaultGridAreas[index] || `item-${index}`;
      const fallbackBox = defaultBoxes[index] || defaultBoxes[0];
      const imageUrl =
        item.Image
          ? `${imageBase}${item.Image}`
          : fallbackBox?.icon?.props?.src || "/images/icons/payment.png";
      const title = item.Title || "Feature";

      // Add line break in the middle for long titles (similar to original design)
      const words = title.split(" ");
      const midPoint = Math.ceil(words.length / 2);
      const firstPart = words.slice(0, midPoint).join(" ");
      const secondPart = words.slice(midPoint).join(" ");

      return {
        icon: <img src={imageUrl} alt={item.Title || ""} />,
        text: (
          <>
            <h5>
              {words.length > 3 ? (
                <>
                  {firstPart} <br /> {secondPart}
                </>
              ) : (
                title
              )}
            </h5>
          </>
        ),
        gridArea: gridArea,
      };
    });
  }

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
            // data-animation="opacity"
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
