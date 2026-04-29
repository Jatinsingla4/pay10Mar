import Link from "next/link";
import Style from "./not-found.module.scss";

export default function NotFound() {
  return (
    <section className={Style.wrapper}>
      <div className={Style.page_not_found_main}>
        <div className={Style.page_not_found_content}>
          <h2 data-animation="opacity-up">404</h2>
          <h3 data-animation="opacity-up">This page isn't here anymore.</h3>

          <p data-animation="opacity-up">
            Let's get you back on track. Please visit our home page or try our
            help centre.
          </p>

          <div data-animation="opacity-up">
            <Link href="/">Visit the homepage</Link>
          </div>
        </div>

        <div className={Style.page_not_found_img} data-animation="scale-up">
          <img src="/images/not_found_img/computer.svg" alt="Not Found" />
        </div>
      </div>
    </section>
  );
}
