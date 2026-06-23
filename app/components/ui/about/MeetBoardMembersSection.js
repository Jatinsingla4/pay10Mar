import React from "react";
import Style from './MeetBoardMember.module.scss';

const MeetBoardMembersSection = ({ section4, section4Heading }) => {

  // Default fallback board members
  const defaultBoardMembersBox = [
    {
      nme: "Lokesh Sharma",
      role: "Director & President",
      desc: "15 + experience in Banking, Financial Inclusion, Digital Payments, Financial Lending in Micro Finance, Development of PPI Wallets. Has been part of many new initiatives like: FLP (Financial Literacy Program, Successful Disbursement through first DBT Project of GOI. ",
      img: "/images/about_images/board_members/board_member1.jpg",
    },
    {
      nme: "Dr. Atul Mehta",
      role: "Director and CEO ",
      desc: "Atul has 18 years of exceptional expertise in fostering the development and expansion of organisations. His outstanding qualifications comprise a Postgraduate degree from IIM Ahmedabad, a B.E. in Electrical Engineering from PEC Chandigarh, and an honoris causa PhD from Maryland State University. With a distinguished career spanning various domains including Fintech and Alliances, Atul's strategic foresight, client-centric approach, and dedication to mentorship are commendable.",
      img: "/images/about_images/board_members/board_member1.jpg",
    },
    {
      nme: "Ravindra Pandey",
      role: "Director",
      desc: "Mr. Ravindra Pandey is a Postgraduate and senior banker having rich experience of 37+ years with proven track record in top leadership roles in domestic and international assignments.",
      img: "/images/about_images/board_members/board_member1.jpg",
    },
  ];

  // Always use fallback board members (no API)
  const boardMembersBox = defaultBoardMembersBox;

  return (
    <>
      <h2 className={Style.board_member_heading} data-animation="opacity-up">
        {section4Heading}
      </h2>
      <div className={Style.board_members_box} data-animation="opacity-up">
        {boardMembersBox.map((boardMem, idx) => (
          <div key={idx} className={Style.member_box}>
            <div className={Style.board_member_img}>
              <img src={boardMem.img} alt={boardMem.nme} />
            </div>
            <div className={Style.board_member_content}>
              <div className={Style.identity}>
                <h4>{boardMem.nme}</h4>
                <p>{boardMem.role}</p>
              </div>
              <p>{boardMem.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MeetBoardMembersSection;
