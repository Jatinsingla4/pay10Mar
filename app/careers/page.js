import BizHeroBanner from "@/app/components/ui/product/BizHeroBanner";
import styles from "./careers.module.scss";

/** Concentric rings only — no floating product icons */
const careersBannerDecorations = [
  {
    id: "circle-1",
    type: "circle",
    size: { width: "90vmax", height: "90vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: "circle-2",
    type: "circle",
    size: { width: "65vmax", height: "65vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
  {
    id: "circle-3",
    type: "circle",
    size: { width: "40vmax", height: "40vmax" },
    position: {
      desktop: { top: "50%", left: "50%" },
      mobile: { top: "50%", left: "50%" },
    },
    strokeWidth: 2,
    opacity: 1,
  },
];

export default function CareersPage() {
  return (
    <main className={styles.careers}>
      <BizHeroBanner
        className={styles.careers_banner}
        title="Where Your Ambition Meets Our Innovation"
        description=""
        eyebrow=""
        ctaText=""
        ctaImgSrc=""
        heroImage={{
          src: "/images/careers/careers-team-reference.png",
          alt: "Pay10 — join our team",
          width: 1024,
          height: 455,
        }}
        decorations={careersBannerDecorations}
      />
    </main>
  );
}
