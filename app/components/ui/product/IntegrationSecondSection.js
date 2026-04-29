import React from "react";
import Style from "./IntegrationSecondSection.module.scss";

const isProbablyHtml = (value) => /<\/?[a-z][\s\S]*>/i.test(String(value || ""));

const pickBoldAndParagraph = (html) => {
  const src = String(html || "");
  if (!src) return { heading: "", description: "" };
  const heading = src.match(/<b[^>]*>(.*?)<\/b>/i)?.[1] || "";
  const description = src.match(/<p[^>]*>(.*?)<\/p>/i)?.[1] || "";
  return { heading, description };
};

const IntegrationSecondSection = ({
  heading,
  description,
  htmlContent,
  renderHtml = false,
}) => {
  const parsed = htmlContent ? pickBoldAndParagraph(htmlContent) : { heading: "", description: "" };
  const resolvedHeading =
    heading ||
    parsed.heading ||
    "Sell your products and services from a website or mobile app with our quick and simple integration method.";
  const resolvedDescription =
    description ||
    parsed.description ||
    "Pay10 offers you eight of the most popular website development plugins to help take your sales and business to the next level.";

  return (
    <section className={Style.integration_second_section}>
      <div className={Style.section_text}>
        <div data-animation="opacity-up">
          <h2>{resolvedHeading}</h2>
        </div>
        <div data-animation="opacity-up">
          <p>{resolvedDescription}</p>
        </div>
        {renderHtml && htmlContent && isProbablyHtml(htmlContent) ? (
          <div
            className={Style.section_html}
            data-animation="opacity-up"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : null}
      </div>
    </section>
  );
};

export default IntegrationSecondSection;
