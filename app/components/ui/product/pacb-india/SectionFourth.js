"use client";

import React from "react";
import Style from "./SectionFourth.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SectionFourth = ({ sliderData = null }) => {
  const defaultSliderData = [
    {
      image: "/images/product_page_images/img1.png",
      text: "Request for Cross-border",
    },
    {
      image: "/images/product_page_images/img2.png",
      text: "Submit KYC",
    },
    {
      image: "/images/product_page_images/img1.png",
      text: "Enable Payments",
    },
    {
      image: "/images/product_page_images/img1.png",
      text: "Request for Cross-border",
    },
    {
      image: "/images/product_page_images/img2.png",
      text: "Submit KYC",
    },
    {
      image: "/images/product_page_images/img1.png",
      text: "Enable Payments",
    },
  ];

  const finalSliderData = sliderData || defaultSliderData;

  return (
    <section className={Style.section_fourth}>
      <div className={Style.wrapper}>
        <div className={Style.section_fourth_slider}>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={1000}
            // pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className={Style.swiper}
            data-animation="opacity-up"
          >
            {finalSliderData.map((item, index) => (
              <SwiperSlide key={index} className={Style.slide}>
                <div className={Style.section_fourth_box}>
                  <div className={Style.section_fourth_image}>
                    <img src={item.image} alt={item.text} />
                  </div>
                  <p>{item.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SectionFourth;
