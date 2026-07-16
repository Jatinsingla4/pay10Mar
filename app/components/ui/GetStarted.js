import Link from "next/link";
import Image from "next/image";
import React from "react";
import Style from './GetStarted.module.scss'
import GlobalContactCTA from './GlobalContactCTA';

const GetToKnow = () => {

  const allImages = [
    {
      img: '/images/img1.png'
    },
    {
      img: '/images/img2.png'
    },
    {
      img: '/images/img3.png'
    },
    {
      img: '/images/img4_new.png'
    },
    {
      img: '/images/img5.png'
    },
    {
      img: '/images/img6.png'
    },
    {
      img: '/images/img71_new.png'
    },
  ]

  return (
    <section className={Style.wrapper}>
      <div style={{ width: '100%' }}>
        <GlobalContactCTA title="Get Started Today" />
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
