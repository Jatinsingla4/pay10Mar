"use client";

import { useId } from "react";
import Image from "next/image";
import GradientAccordion from "@/app/components/ui/blocks/GradientAccordion";
import Style from "./AdaptivePaymentIntegrationSection.module.scss";

const isProbablyHtml = (value) => /<\/?[a-z][\s\S]*>/i.test(String(value || ""));

const resolveImageSrc = (raw, imageBase = "") => {
  if (!raw) return "";
  const src = String(raw);
  if (/^https?:\/\//i.test(src) || src.startsWith("/")) return src;
  return `${imageBase}${src}`;
};

const parseItemDescription = (raw) => {
  const text = String(raw || "").replace(/\r\n/g, "\n").trim();
  if (!text) return { body: "", ctaText: "", ctaHref: "" };

  // If backend sends HTML, keep it as body and do not try to split into CTA.
  if (isProbablyHtml(text)) return { body: text, ctaText: "", ctaHref: "" };

  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length <= 1) return { body: lines[0] || "", ctaText: "", ctaHref: "" };

  const ctaText = lines[lines.length - 1];
  const body = lines.slice(0, -1).join("\n");

  // Optional URL extraction if present in the CTA line
  const urlMatch = ctaText.match(/(https?:\/\/\S+)/i);
  const ctaHref = urlMatch ? urlMatch[1] : "";
  const cleanedCtaText = urlMatch ? ctaText.replace(urlMatch[1], "").trim() : ctaText;

  return { body, ctaText: cleanedCtaText, ctaHref };
};

const ExternalLinkIcon = ({ className = "" }) => {
  // Ensure <linearGradient id="..."> is unique per instance (prevents collisions)
  const rid = useId().replace(/:/g, "");
  const g0 = `paint0_linear_${rid}`;
  const g1 = `paint1_linear_${rid}`;
  const g2 = `paint2_linear_${rid}`;

  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M17.5 10.8333V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H9.16667"
        stroke={`url(#${g0})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 2.5L10 10"
        stroke={`url(#${g1})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 2.5H17.5V7.5"
        stroke={`url(#${g2})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={g0} x1="2.5" y1="10" x2="17.5" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--red)" />
          <stop offset="40%" stopColor="var(--orange)" />
          <stop offset="100%" stopColor="var(--yellow)" />
        </linearGradient>
        <linearGradient id={g1} x1="10" y1="6.25" x2="17.5" y2="6.25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB07" />
          <stop offset="1" stopColor="#EF1A23" />
        </linearGradient>
        <linearGradient id={g2} x1="12.5" y1="5" x2="17.5" y2="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFBB07" />
          <stop offset="1" stopColor="#EF1A23" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const AdaptivePaymentIntegrationSection = ({
  heading = "",
  description = "",
  image = "",
  imageBase = "",
  items = [],
  knowMoreLabel = "Know More",
  knowMoreHref = "https://pay10global.atlassian.net/wiki/external/ZTYxOTg1YjhiNjIyNDYzYjg4ZTFiNmJiYzc5ZDU1OTA",
}) => {
  const imageSrc = resolveImageSrc(image, imageBase);

  const accordionItems = (Array.isArray(items) ? items : []).map((it, idx) => {
    const title = it?.Title || it?.title || "";
    const { body, ctaText, ctaHref } = parseItemDescription(it?.Description || it?.description);

    const content =
      isProbablyHtml(body) ? (
        <div>
          <div
            className={Style.itemBody}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {ctaText ? (
            <div className={Style.itemCtaRow}>
              {ctaHref ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Style.itemCta}
                >
                  {ctaText} <ExternalLinkIcon className={Style.itemCtaIcon} />
                </a>
              ) : (
                <span className={Style.itemCta}>
                  {ctaText} <ExternalLinkIcon className={Style.itemCtaIcon} />
                </span>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <div className={Style.itemBody}>
            {body.split("\n").map((line, i) => (
              <p key={`${idx}-${i}`} className={Style.itemBodyLine}>
                {line}
              </p>
            ))}
          </div>
          {ctaText ? (
            <div className={Style.itemCtaRow}>
              {ctaHref ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={Style.itemCta}
                >
                  {ctaText} <ExternalLinkIcon className={Style.itemCtaIcon} />
                </a>
              ) : (
                <span className={Style.itemCta}>
                  {ctaText} <ExternalLinkIcon className={Style.itemCtaIcon} />
                </span>
              )}
            </div>
          ) : null}
        </div>
      );

    return { id: `${idx}-${title}`, title, content };
  });

  if (!heading && !description && !imageSrc && !accordionItems.length) return null;

  return (
    <section className={Style.section}>
      <div className={Style.wrapper}>
        <div className={Style.grid}>
          <div className={Style.imageCol} data-animation="opacity-up">
            {imageSrc ? (
              <div className={Style.imageCircle}>
                <Image
                  src={imageSrc}
                  alt={heading || "Adaptive Payment Integration"}
                  fill
                  sizes="(max-width: 768px) 85vw, 560px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : null}
          </div>

          <div className={Style.contentCol}>
            {heading ? (
              <h2 className={Style.heading} data-animation="opacity-up">
                {heading}
              </h2>
            ) : null}

            {description ? (
              <p className={Style.description} data-animation="opacity-up">
                {description}
              </p>
            ) : null}

            <div className={Style.accordionWrap} data-animation="opacity-up">
              <GradientAccordion items={accordionItems} />
            </div>

            {knowMoreLabel ? (
              <div className={Style.footerCta} data-animation="opacity-up">
                {knowMoreHref ? (
                  <a href={knowMoreHref} className={Style.knowMore}>
                    {knowMoreLabel}
                  </a>
                ) : (
              <span className={Style.knowMore}>
                    {knowMoreLabel}
                  </span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdaptivePaymentIntegrationSection;


