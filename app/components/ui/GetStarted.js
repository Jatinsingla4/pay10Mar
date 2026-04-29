import Link from "next/link";
import Image from "next/image";
import React from "react";
import Style from './GetStarted.module.scss'

const GetToKnow = () => {

  const allImages = [
    {
      img: '/images/img1.png'
    },
    {
      img: '/images/fg1.png'
    },
    {
      img: '/images/img3.png'
    },
    {
      img: '/images/img4.png'
    },
    {
      img: '/images/fg2.png'
    },
    {
      img: '/images/img6.png'
    },
    {
      img: '/images/img71.webp'
    },
  ]

  return (
    <section className={Style.wrapper}>
      <div className={Style.get_to_know}>
        <div data-animation="opacity-up">
          <h2>Get Started Today</h2>
        </div>
        <div data-animation="opacity-up">
          <Link href='/contact-us'>Get In Touch</Link>
        </div>
      </div>
      <div className={Style.image_container} data-animation="opacity-up">
        {allImages.map((image, idx)=>
          <div key={idx} className={Style.img_box}>
            <Image width={300} height={300} src={image.img} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};

export default GetToKnow;
