"use client";

import React, { useState } from "react";
import Image from "next/image";
import Style from "./blog-details.module.scss";
import Link from "next/link";
import { InlineIcon } from "@iconify/react";

const page = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      title: "Enhanced Security",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Global Reach",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Seamless Integration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Real-time Transaction Processing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Improved Cash Flow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Customer Convenience",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
    {
      title: "Fraud Prevention Measures",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, odio eu gravida placerat, neque urna vestibulum tortor, a ullamcorper turpis neque ut nisl. Donec augue massa, condimentum a accumsan id, gravida ac urna. Vivamus lacinia ex eu augue vehicula varius. Etiam malesuada tempus orci vel pharetra. Cras dapibus nisi eget tortor malesuada, non convallis mauris pulvinar. Sed auctor diam in tristique varius. Nullam nec ante et felis egestas convallis nec pulvinar mauris.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <main>
      <Link data-animation="scale-up" href="/blog" className={Style.backto_blog}>
        <span>
          {/* <img src="/images/icons/left_chevron.png" alt="" /> */}
          <InlineIcon
            icon="qlementine-icons:chevron-left-16"
            width="20"
            height="20"
          />
        </span>
        <span>Back To Blog</span>
      </Link>
      <div className={Style.blog_details_banner} data-animation="opacity-up">
        <div className={Style.wrapper}>
          <p>15 March 2024</p>
          <h2>
            Online Payment Gateways: A Modern Commerce Essential and its
            Advantages
          </h2>
        </div>
      </div>

      <div className={Style.wrapper}>
        <div className={Style.details}>
          <h3 data-animation="opacity-up">
            The convenience and efficiency of online transactions have
            revolutionized the way we conduct business in this digital era.{" "}
          </h3>
          <p data-animation="opacity-up">
            Digital Payment gateway is one of the most imperative components
            facilitating the evolution of the advent of online payment gateways.
            These gateways serve as the intermediary between merchants and
            customers, securely processing transactions over the Internet.
            Beyond mere facilitation, online payment gateways offer a myriad of
            benefits that streamline operations, enhance security, and elevate
            customer satisfaction. Let's delve into the advantages that make
            online payment gateways indispensable in the modern commerce
            landscape.
          </p>
        </div>
      </div>

      <div className={Style.img_second} data-animation="opacity-up">
        <Image
          src="/images/blog_page_images/blog_details_imgs/img2.png"
          alt=""
          width={1600}
          height={900}
          sizes="100vw"
          className={Style.desktopImage}
        />
        <Image
          src="/images/blog_page_images/blog_details_imgs/mob_img2.png"
          alt=""
          width={900}
          height={900}
          sizes="100vw"
          className={Style.mobileImage}
        />
      </div>

      <div className={Style.wrapper}>
          <div className={Style.work_details}>
            <div data-animation="opacity-up">
                <h3>How Do Payment <br /> Gateways Work ?</h3>
                <p style={{marginTop: "1rem"}}>Payment gateways serve as intermediaries between merchants and customers during online transactions. While a customer purchases on a website, the payment gateway securely collects their payment information. This sensitive data is encrypted to prevent unauthorized access during transmission over the internet. Next, the payment gateway forwards this encrypted information to the payment processor, which decrypts it and routes it to the appropriate bank or financial institution for authorization. The customer's bank verifies the transaction details, including available funds and validity, and either approves or declines the transaction.</p>
            </div>
            <div style={{textAlign: 'center'}} data-animation="opacity-up">
                <Image
                  src="/images/blog_page_images/blog_banner_img.png"
                  alt=""
                  width={900}
                  height={600}
                  sizes="(max-width: 600px) 100vw, 70vw"
                  className={Style.workImage}
                />
            </div>
            <div data-animation="opacity-up">
                <p>Upon receiving the authorization response, the payment gateway relays it back to the merchant's website. If the transaction is approved, the customer's account is charged, and the merchant can fulfil the order. In case of a decline, the customer is notified, and they may attempt the transaction again or use an alternative payment method.</p>
            </div>
            <div data-animation="opacity-up">
                <p>Throughout this process, security measures such as encryption, tokenization, and fraud detection algorithms are employed to safeguard sensitive information and mitigate the risk of fraudulent activities, ensuring a safe and seamless online payment experience for both merchants and customers.</p>
            </div>
          </div>
      </div>

      <section className={Style.benefits_section}>
        <div className={Style.wrapper}>
          <h3 data-animation="opacity-up">Benefits to Yield from a Reliable Payment</h3>
          <div className={Style.accordion} data-animation="opacity-up">
            {benefits.map((item, index) => {
              const isActive = activeIndex === index;
              const hasDescription = Boolean(item.description);
              return (
                <div
                  key={item.title}
                  className={`${Style.accordion_item} ${isActive ? Style.active : ""}`}
                >
                  <button
                    type="button"
                    className={Style.accordion_header}
                    onClick={() => handleToggle(index)}
                    aria-expanded={isActive}
                  >
                    <span className={Style.toggle_sign} aria-hidden="true"></span>
                    <span>{item.title}</span>
                  </button>
                  {hasDescription && (
                    <div
                      className={`${Style.accordion_body} ${isActive ? Style.open : ""}`}
                      aria-hidden={!isActive}
                    >
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={Style.wrapper}>
          <div className={Style.boost_payment}>
            <h3 data-animation="opacity-up">How can Pay10 Payment Gateway boost your business?</h3>
            <p data-animation="opacity-up">The benefits of using online payment gateways extend far beyond transaction processing. From enhanced security and global reach to seamless integration and customer convenience, Pay10 Payment gateway plays a pivotal role in driving the growth and success of modern businesses in the digital landscape. By leveraging the advantages offered by online payment gateways, merchants can streamline operations, expand their market reach, and deliver unparalleled shopping experiences that foster long-term customer loyalty. As technology continues to evolve, online payment gateways will remain indispensable tools for facilitating secure, efficient, and frictionless transactions in the ever-changing realm of commerce.</p>
          </div>
      </section>
    </main>
  );
};

export default page;
