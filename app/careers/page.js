import MapHeroBanner, {
  mapHeroBreathingCircles,
} from "@/app/components/ui/product/MapHeroBanner";
import styles from "./careers.module.scss";

export default function CareersPage() {
  return (
    <main className={styles.careers}>
      <MapHeroBanner
        className={styles.careers_banner}
        eyebrow=""
        title="Where Your Ambition Meets Our Innovation"
        description=""
        ctaText=""
        mapImageSrc=""
        decorations={mapHeroBreathingCircles}
        layoutClassName={styles.careers_banner_layout}
        titleClassName={styles.careers_banner_title}
        imageWrapClassName={styles.careers_banner_image_wrap}
        imageClassName={styles.careers_banner_image}
        heroImage={{
          src: "/images/careers/careers_banner_img.png",
          alt: "Pay10 — join our team",
          width: 1024,
          height: 455,
        }}
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
