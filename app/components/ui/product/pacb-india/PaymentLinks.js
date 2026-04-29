import React from "react";
import Style from "./PaymentLinks.module.scss";
import VerticalCardsListing from "./VerticalCardsListing";
import Image from "next/image";

const PaymentLinks = ({
  heading = "Instant Payment Links",
  description = "Get paid instantly with easy, flexible payment links, bills, and invoices you can share directly with your customers.",
  image = "/images/product_page_images/cards_listing_right_img.png",
  items = []
}) => {
  const resolvedImage =
    typeof image === "string" ? (image.trim() ? image.trim() : null) : image;

  return (
    <>
      <section className={Style.wrapper}>
        <div className={Style.instant_payment_text}>
          <div>
            <div data-animation="opacity-up">
              <h3>{heading}</h3>
            </div>
            <div data-animation="opacity-up">
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>

        <div className={Style.content}>
          <VerticalCardsListing items={items} />
          {resolvedImage ? (
            <div className={Style.content_right_img} data-animation="opacity-up">
              <Image
                width={571}
                height={680}
                src={resolvedImage}
                alt="Instant Payment"
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default PaymentLinks;
