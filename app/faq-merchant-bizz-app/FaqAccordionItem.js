"use client";

import React from "react";
import { formatFaqRichText } from "./formatFaqMarks";
import Style from "./faq-merchant-bizz-app.module.scss";

const FaqAccordionItem = ({
  id,
  question,
  answer = "",
  answerList = [],
  open,
  onToggle,
  linkClass = "",
}) => {
  const panelId = `faq-panel-${id}`;
  const buttonId = `faq-trigger-${id}`;
  const hasList = Array.isArray(answerList) && answerList.length > 0;
  const hasLead = typeof answer === "string" && answer.trim().length > 0;

  return (
    <div className={Style.faqItem} id={id}>
      <h3 className={Style.faqQuestionWrap}>
        <button
          type="button"
          id={buttonId}
          className={Style.faqTrigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={Style.faqChevron} aria-hidden="true">
            {open ? "−" : "+"}
          </span>
          <span className={Style.faqQuestionText}>{question}</span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`${Style.faqPanel} ${open ? Style.faqPanelOpen : ""}`}
        aria-hidden={!open}
      >
        <div className={Style.faqPanelMeasure}>
          <div className={Style.faqAnswerInner}>
            {hasLead ? (
              <p className={Style.faqParagraph}>
                {formatFaqRichText(answer.trim(), linkClass)}
              </p>
            ) : null}
            {hasList ? (
              <ul className={Style.faqList}>
                {answerList.map((line, idx) => (
                  <li key={`${id}-li-${idx}`}>
                    {formatFaqRichText(line, linkClass)}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordionItem;
