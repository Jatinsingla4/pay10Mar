"use client";

import React from "react";
import Link from "next/link";
import Style from "./ThreeStepProcess.module.scss";
/** Build a valid image src from CMS paths (inline replacement for deleted cmsImageSrc). */
function cmsImageSrc(path, base = '') {
  if (path == null || String(path).trim() === '') return null;
  const p = String(path).trim();
  if (/^https?:\/\//i.test(p)) return p;
  const b = String(base || '').replace(/\/$/, '');
  const rel = p.replace(/^\//, '');
  if (!b) return `/${rel}`;
  return `${b}/${rel}`;
}

/** Both cards link to the live contact page (hardcoded). */
const CONTACT_PAGE_URL = "https://pay10.ae/contact-us/";

/** Shown when CMS item has no button label (matches design defaults). */
const DEFAULT_CTA_LABELS = ["Get in touch", "Need Help"];

function fallbackCtaLabel(index) {
  return DEFAULT_CTA_LABELS[index] ?? DEFAULT_CTA_LABELS[0];
}

function pickTitle(item) {
  return item?.Title ?? item?.title ?? "";
}

function pickDescription(item) {
  return item?.Description ?? item?.description ?? "";
}

function pickImagePath(item) {
  return item?.Image ?? item?.image ?? "";
}

function pickCtaLabel(item) {
  return (
    item?.button_text ??
    item?.ButtonText ??
    item?.button_label ??
    item?.cta_text ??
    item?.cta_label ??
    item?.CTA_Label ??
    item?.Button ??
    item?.button ??
    item?.cta ??
    ""
  );
}

const ThreeStepProcess = ({ steps = [], items = [], imageBase = "" }) => {
  const defaultSteps = [
    {
      title: "Self-Onboarding",
      description:
        "Set up your Pay10 Biz Digital Wallet in minutes on the merchant app.",
      backgroundImage: "/images/divider_img.png",
      ctaLabel: "Get in touch",
      ctaHref: CONTACT_PAGE_URL,
    },
    {
      title: "24/7 Support",
      description:
        "Reach out to our team anytime of the day for any questions or support.",
      backgroundImage: "/images/divider_img.png",
      ctaLabel: "Need Help",
      ctaHref: CONTACT_PAGE_URL,
    },
  ];

  const apiSteps =
    Array.isArray(items) && items.length > 0
      ? items.map((item, index) => {
          const imagePath = pickImagePath(item);
          const bg = imagePath
            ? cmsImageSrc(imagePath, imageBase) || ""
            : "";
          const rawLabel = pickCtaLabel(item);
          const label =
            typeof rawLabel === "string" && rawLabel.trim()
              ? rawLabel.trim()
              : fallbackCtaLabel(index);
          return {
            title: pickTitle(item),
            description: pickDescription(item),
            backgroundImage: bg,
            ctaLabel: label,
            ctaHref: CONTACT_PAGE_URL,
          };
        })
      : null;

  const displaySteps = (
    apiSteps || (steps.length > 0 ? steps : defaultSteps)
  ).map((step, index) => {
    const raw = step.ctaLabel;
    const label =
      typeof raw === "string" && raw.trim()
        ? raw.trim()
        : fallbackCtaLabel(index);
    return {
      ...step,
      ctaHref: CONTACT_PAGE_URL,
      ctaLabel: label,
    };
  });
  const singleColumn = displaySteps.length === 1;

  return (
    <section className={Style.three_step_process}>
      <div className={Style.wrapper}>
        <div
          className={`${Style.steps_container} ${
            singleColumn ? Style.steps_container_single : ""
          }`.trim()}
        >
          {displaySteps.map((step, index) => {
            const href = step.ctaHref;
            const label = step.ctaLabel;
            const showCta = Boolean(href);
            const isExternal = /^https?:\/\//i.test(href);

            return (
              <div
                key={index}
                className={Style.step_card}
                data-animation="opacity-up"
              >
                <div
                  className={Style.card_background}
                  style={{
                    backgroundImage: step.backgroundImage
                      ? `url(${step.backgroundImage})`
                      : undefined,
                  }}
                >
                  <div className={Style.card_overlay} />
                  <div className={Style.card_content}>
                    <h3 className={Style.card_title}>{step.title}</h3>
                    <p className={Style.card_description}>{step.description}</p>
                    {showCta &&
                      (isExternal ? (
                        <a
                          href={href}
                          className={Style.card_cta}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{label}</span>
                        </a>
                      ) : (
                        <Link href={href} className={Style.card_cta}>
                          <span>{label}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
