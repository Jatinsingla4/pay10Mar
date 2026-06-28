import CareersHeroBanner from "@/app/components/ui/careers/CareersHeroBanner";
import styles from "./careers.module.scss";

export const metadata = {
  title: "Careers - Pay 10",
  description: "Join the Pay10 team. Build your future with Pay10, building smart, secure, and fast payment solutions in the UAE.",
  alternates: {
    canonical: "https://pay10.ae/careers",
  },
};

export default function CareersPage() {
  return (
    <main className={styles.careers}>
      <CareersHeroBanner />

      <section className="wrapper">
        <div className={styles.content} data-animation="fade-up">
          <h2>Build Your Future With Pay10</h2>
          <p>At Pay10, we’re building smart, secure, and fast payment solutions - and we’re looking for people who want to grow with us. If you love solving real-world problems, enjoy teamwork, and want to work in a place where your ideas actually matter, you’ll fit right in. Join us and help shape the future of digital payments.</p>
        </div>

        <div className={styles.jobs_box} data-animation="fade-up" data-anim-delay="300">
          <iframe
            src="https://pay10.webhr.co/hr/careers/"
            style={{ marginTop: "0px", marginLeft: "0px", width: "100%", height: "600px" }}
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
