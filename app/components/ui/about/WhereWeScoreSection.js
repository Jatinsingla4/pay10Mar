import React from "react";
import Style from './WhereWeScore.module.scss'

const VolumeIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f79d00" />
        <stop offset="100%" stopColor="#eb1e23" />
      </linearGradient>
    </defs>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const FrictionlessIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const SupportIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const RiskIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const SecureIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UpdatesIcon = () => (
  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"></path>
    <path d="M1 20v-6h6"></path>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
);


const WhereWeScoreSection = ({
  section3Heading = "Where We Score High",
}) => {
  const boxes = [
    {
      icon: <VolumeIcon />,
      text: "Large payment volume capacity",
    },
    {
      icon: <FrictionlessIcon />,
      text: "Frictionless Payment Experience",
    },
    {
      icon: <SupportIcon />,
      text: "Far-reaching Customer Support",
    },
    {
      icon: <RiskIcon />,
      text: "Intelligent risk management to monitor transactions",
    },
    {
      icon: <SecureIcon />,
      text: "Simple, Secure, and reliable payment process",
    },
    {
      icon: <UpdatesIcon />,
      text: "Frequent merchant updates",
    }
  ];

  return (
    <div className={Style.where_we_score_new}>
      <div className={Style.header_content}>
        <h2 data-animation="opacity">{section3Heading}</h2>
      </div>
      <div className={Style.score_container} data-animation="opacity">
        {boxes.map((box, index) => (
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
