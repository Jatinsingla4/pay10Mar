import React from "react";
import Style from "./MeetBoardMember.module.scss";

const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

const UaeAdvisorSection = ({ section7, section7Heading }) => {
  const advisors = Array.isArray(section7?.uae_advisor_list) && section7.uae_advisor_list.length > 0
    ? section7.uae_advisor_list.map((item) => {
        const designation = item["Designation "] || item.Designation || "";

        return {
          name: item.Name || "",
          role: designation.trim(),
          description: item.Description || "",
          image: item.Image ? `${imageBase}${item.Image}` : "/images/about_images/board_members/board_member1.jpg",
        };
      })
    : [];

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
