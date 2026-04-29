import React from "react";
import Style from "./MultiPayment.module.scss";
import Image from "next/image";
import SmallCardsGrid from "./SmallCardsGrid";

const MultiPaymentsMethod = ({
  heading = "Multiple Payment Methods",
  description = "Give your customers multiple choices to choose from at checkout. Pay10 enables payments through the most dependable local and international methods.",
  items = [],
  imageBase = ''
}) => {
  return (
    <>
      <section className={Style.multi_payment_container} style={{backgroundImage:"url(/images/product_page_images/multiple_payments_bg.png)", backgroundRepeat:"no-repeat", backgroundPosition: "center center", backgroundSize:"cover"}}>   
        {/* <div className={Style.multi_payment_bg_img}>
          <Image
            width={1440}
            height={541}
            src="/images/product_page_images/multiple_payments_bg.png"
            alt="Multiple Payments"
          />
        </div> */}
          <div className={Style.multi_payment_content}>
            <div className={Style.multi_payment_text}>
              <div data-animation="opacity-up">
                <h3>{heading}</h3>
              </div>
              <div data-animation="opacity-up">
                <p dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </div>
            <SmallCardsGrid items={items} imageBase={imageBase} />
          </div>
      </section>
    </>
  );
};

export default MultiPaymentsMethod;
