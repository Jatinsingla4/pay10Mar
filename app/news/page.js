import React from "react";
import Image from "next/image";
import Style from "./news.module.scss";
import { Icon } from "@iconify/react";
import Link from "next/link";

const page = () => {
  const newsBoxes = [
    {
      img: "/images/news_images/news_banner_img.png",
      smalltxt: "15 March 2024",
      heading: "Online Payment Gateways: A Modern Commerce Essential and its Advantages",
      link: "/",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus lectus at magna luctus, ac laoreet ex malesuada. Vivamus eleifend placerat libero in luctus.",
    },
    {
      img: "/images/news_images/news_banner_img.png",
      smalltxt: "15 March 2024",
      heading: "Online Payment Gateways: A Modern Commerce Essential and its Advantages",
      link: "/",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus lectus at magna luctus, ac laoreet ex malesuada. Vivamus eleifend placerat libero in luctus.",
    },
    {
      img: "/images/news_images/news_banner_img.png",
      smalltxt: "15 March 2024",
      heading: "Online Payment Gateways: A Modern Commerce Essential and its Advantages",
      link: "/",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus lectus at magna luctus, ac laoreet ex malesuada. Vivamus eleifend placerat libero in luctus.",
    },
    {
      img: "/images/news_images/news_banner_img.png",
      smalltxt: "15 March 2024",
      heading: "Online Payment Gateways: A Modern Commerce Essential and its Advantages",
      link: "/",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse cursus lectus at magna luctus, ac laoreet ex malesuada. Vivamus eleifend placerat libero in luctus.",
    },
  ];

  return (
    <>
      <main>
        <div className={Style.news_banner}>
          <Image
            src="/images/blog_page_images/blog_bannerr_circle.png"
            className={Style.news_banner_circle}
            alt=""
            width={1200}
            height={1200}
            sizes="(max-width: 900px) 0px, 60vw"
            data-animation="opacity-up"
          />
          <div className={Style.wrapper}>
            <div className={Style.news_content}>
              <div className={Style.news_banner_headings}>
                <h5 data-animation="opacity-up">PAY10 NEWS</h5>
                <h2 data-animation="opacity-up">
                  Stay in the know with the latest Pay10news and reviews.
                </h2>
              </div>
              <div className={Style.news_banner_content}>
                <div className={Style.news_banner_left_img}>
                  <Image
                    src="/images/news_images/news_banner_img.png"
                    alt=""
                    width={470}
                    height={470}
                    sizes="(max-width: 900px) 80vw, 470px"
                    className={Style.newsHeroImage}
                    data-animation="opacity-up"
                    style={{ height: "auto" }}
                  />
                </div>
                <div
                  className={Style.news_banner_right_content}
                  data-animation="opacity-up"
                >
                  <h6>15 March 2024</h6>
                  <h3>
                    Online Payment Gateways: A Modern Commerce Essential and its
                    Advantages
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse cursus lectus at magna luctus, ac laoreet ex
                    malesuada. Vivamus eleifend placerat libero in luctus.
                  </p>
                  <a href="#" className={Style.news_content_icon}>
                    <Icon icon="fa6-solid:angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className={Style.wrapper}>
          <div className={Style.all_news_container}>
            {newsBoxes.map((news, idx) => (
              <div key={idx} className={Style.news_box}>
                <div className={Style.news_box_img}>
                  <Link href={news.link}>
                        <Image
                          src="/images/news_images/news_banner_img.png"
                          alt=""
                          width={600}
                          height={400}
                          sizes="(max-width: 991px) 100vw, 300px"
                          className={Style.newsCardImage}
                          style={{ height: "auto" }}
                        />
                  </Link>
                </div>
                <div className={Style.news_box_content}>
                  <div className={Style.news_box_headings}>
                    <h6>{news.smalltxt}</h6>
                    <Link href={news.link}>
                        <h3>{news.heading}</h3>
                    </Link>
                  </div>
                  <p>{news.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{ textAlign: "center", width: "100%" }}
            data-animation="scale-up"
          >
            <button className={Style.load_more_btn}> Load More </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default page;
