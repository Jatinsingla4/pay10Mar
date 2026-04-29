import React from 'react'
import Image from 'next/image'
import Style from './SpotlightProd.module.scss'
import Link from 'next/link'

const SpotlightProd = ({
  heading = "No Borders, Just Business",
  description = "Accept International Payments Seamlessly from India",
  bannerImage = "/images/product_page_images/pacb-world.png",
  bannerImageMob = "/images/product_page_images/pacb-world-mob.svg",
  logoImage = "/images/product_page_images/pacb_banner_logo.png",
  ctaLink = ""
}) => {
  return (
    <section className={Style.pacb_banner}>
      <div className={Style.pacb_wrapper}>
        <div className={Style.pacb_banner_content}>
          <div className={Style.pacb_banner_text}>
            <div data-animation="opacity-up">
              <Image
                src={logoImage}
                alt=""
                width={240}
                height={90}
                sizes="(max-width: 768px) 30vw, 10vw"
                className={Style.logo}
              />
            </div>
            <div data-animation="opacity-up" data-anim-delay="100">
              <h2>{heading}</h2>
            </div>
            <div data-animation="opacity-up" data-anim-delay="150">
              <p>{description}</p>
            </div>
            <div data-animation="opacity-up" data-anim-delay="200">
              <Link href={ctaLink}>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.banner_img}>
        <Image
          src={bannerImage}
          alt=""
          width={1600}
          height={900}
          sizes="100vw"
          priority
          className={Style.bannerDesktop}
        />
        <Image
          src={bannerImageMob}
          alt=""
          width={1200}
          height={532}
          sizes="100vw"
          priority
          className={Style.bannerMobile}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </section>
  )
}

export default SpotlightProd
