import React from "react";
import Style from "./MeetBoardMember.module.scss";

const UaeAdvisorSection = ({ section7, section7Heading }) => {
  // No API data — always empty (no static advisors defined)
  const advisors = [];

  return (
    <>
      <h2 className={Style.board_member_heading} data-animation="opacity-up">
        {section7Heading}
      </h2>
      <div className={Style.board_members_box} data-animation="opacity-up">
        {advisors.map((advisor, idx) => (
          <div key={idx} className={Style.member_box}>
            <div className={Style.board_member_img}>
              <img src={advisor.image} alt={advisor.name} />
            </div>
            <div className={Style.board_member_content}>
              <div className={Style.identity}>
                <h4>{advisor.name}</h4>
                <p>{advisor.role}</p>
              </div>
              <p>{advisor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UaeAdvisorSection;
