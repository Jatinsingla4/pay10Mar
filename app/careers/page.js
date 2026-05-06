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
          src: "/images/careers/careers_banner_img.png",
          alt: "Pay10 — join our team",
          width: 1024,
          height: 455,
        }}
        decorations={careersBannerDecorations}
      />

      <section className="wrapper">
        <div className={styles.content}>
          <h2>Build Your Future With Pay10</h2>
          <p>At Pay10, we’re building smart, secure, and fast payment solutions — and we’re looking for people who want to grow with us. If you love solving real-world problems, enjoy teamwork, and want to work in a place where your ideas actually matter, you’ll fit right in. Join us and help shape the future of digital payments.</p>
        </div>

        <div className={styles.jobs_box}>
          <iframe
            src="https://pay10.webhr.co/hr/careers/"
            style={{ marginTop: 0, marginLeft: 0, width: "100%", height: "600px" }}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="auto"
          />
        </div>
      </section>
    </main>
  );
}
