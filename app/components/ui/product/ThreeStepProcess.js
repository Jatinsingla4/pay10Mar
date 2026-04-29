"use client";

import React from "react";
import Style from "./ThreeStepProcess.module.scss";

const ThreeStepProcess = ({ steps = [], items = [], imageBase = "" }) => {
  const defaultSteps = [
    {
      title: "Merchant Registration",
      description: "Merchants can easily register and verify their mobile number and email address through a secure OTP process.",
      backgroundImage: "/images/divider_img.png"
    },
    {
      title: "Onboarding and Wallet Creation",
      description: "Merchants must complete their KYC/KYB documentation and validate their business details to activate their account and wallet.",
      backgroundImage: "/images/divider_img.png"
    },
    {
      title: "Start Transacting",
      description: "Once all documents are submitted and verified, merchants move through a smooth, intuitive onboarding and can start transacting.",
      backgroundImage: "/images/divider_img.png"
    }
  ];

  const apiSteps = Array.isArray(items) && items.length > 0
    ? items.map((item) => {
        const imagePath = item?.Image || "";
        const bg = imagePath ? `${imageBase}${imagePath}` : "";
        return {
          title: item?.Title || "",
          description: item?.Description || "",
          backgroundImage: bg,
        };
      })
    : null;

  const displaySteps = apiSteps || (steps.length > 0 ? steps : defaultSteps);

  return (
    <section className={Style.three_step_process}>
      <div className={Style.wrapper}>
        <div className={Style.steps_container}>
          {displaySteps.map((step, index) => (
            <div
              key={index}
              className={Style.step_card}
              data-animation="opacity-up"
            >
              <div
                className={Style.card_background}
                style={{
                  backgroundImage: `url(${step.backgroundImage})`
                }}
              >
                <div className={Style.card_overlay} />
                <div className={Style.card_content}>
                  <h3 className={Style.card_title}>{step.title}</h3>
                  <p className={Style.card_description}>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;

