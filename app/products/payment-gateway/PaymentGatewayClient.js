"use client";

import { Icon } from '@iconify/react';

import Style from "./page.module.scss";

const PaymentGatewayClient = () => {
  return (
    <main>
      <section className={Style.altareq_section}>
        <div className={Style.altareq_hero}>
          <div className={Style.altareq_hero_text}>
            <h2>
              The UAE's most trusted checkout buttons now on your store
            </h2>
          </div>
        </div>
      </section>

      <section className={Style.methods_section}>
        <div className={Style.methods_header}>
          <h2>Two powerful ways<br/>your customers pay online.</h2>
          <p>Add Pay10's payment methods to your checkout in minutes &mdash; a Dynamic QR button and a Pay by Bank option &mdash; giving your customers the fastest, most trusted ways to pay online in the UAE.</p>
        </div>

        <div className={Style.checkout_mockups_wrapper}>
          <div className={Style.checkout_card}>
            <div className={Style.mockup_header}>
              <Icon icon="mdi:cart-outline" width={20} /> Your Online Checkout
            </div>
            <div className={Style.mockup_total}>
              <span>Order total</span>
              <strong>AED 349.00</strong>
            </div>
            <div className={Style.mockup_divider}>&mdash; Choose payment method &mdash;</div>
            <button className={Style.mockup_pay10_btn}>
              <Icon icon="mdi:cellphone" width={18} /> Pay with Pay10
            </button>
            <p className={Style.mockup_hint}>&uarr; Customer clicks this button on your checkout</p>
          </div>

          <div className={Style.checkout_card}>
            <div className={Style.mockup_header}>
              <Icon icon="mdi:cart-outline" width={20} /> Your Online Checkout
            </div>
            <div className={Style.mockup_total}>
              <span>Order total</span>
              <strong>AED 349.00</strong>
            </div>
            <div className={Style.mockup_divider}>&mdash; Choose payment method &mdash;</div>
            <button className={Style.mockup_bank_btn}>
              <Icon icon="mdi:bank-outline" width={18} /> Pay by Bank
            </button>
            <p className={Style.mockup_hint}>&uarr; Customer clicks this button on your checkout</p>
          </div>
        </div>

        <div className={Style.journey_grid}>
          {/* Left Column */}
          <div className={Style.journey_col}>
            <div className={Style.journey_top}>
              <span className={Style.journey_label}>APM &middot; Dynamic QR</span>
              <div className={Style.journey_title_box}>
                <h3><strong>Pay with Pay10</strong><br/>Customer scans a Dynamic QR code to pay directly from their Pay10 UAE App.</h3>
              </div>
            </div>
            <div className={Style.journey_steps}>
              <h4>Customer checkout journey</h4>
              <ol>
                <li>Clicks "Pay with Pay10" &mdash; a Dynamic QR code is instantly generated on screen.</li>
                <li>Opens Pay10 UAE App &amp; scans the Dynamic QR code with their phone.</li>
                <li>Confirms payment amount and merchant name shown in app before confirming.</li>
                <li>Payment confirmed &mdash; order confirmed on your checkout. Instant. Done.</li>
              </ol>
            </div>
            <div className={Style.journey_footer}>
              <p><em>Customer doesn't have Pay10 UAE App? They're directed to download it turning your checkout into a Pay10 acquisition moment.</em></p>
            </div>
          </div>

          {/* Right Column */}
          <div className={Style.journey_col}>
            <div className={Style.journey_top}>
              <span className={Style.journey_label}>TPP &middot; Open Finance &middot; Al Tareq</span>
              <div className={Style.journey_title_box}>
                <h3><strong>Pay by Bank</strong><br/>Customer pays directly from their bank account no card, no wallet, just their bank.</h3>
              </div>
            </div>
            <div className={Style.journey_steps}>
              <h4>Customer checkout journey</h4>
              <ol>
                <li>Clicks "Pay by Bank" &mdash; redirected to securely connect to their bank.</li>
                <li>Authorizes payment within their bank's secure environment.</li>
                <li>Returns to checkout.</li>
                <li>Payment confirmed &mdash; order confirmed on your checkout. Instant. Done.</li>
              </ol>
            </div>
            <div className={Style.journey_footer}>
              <p><em>Powered by Al Tareq the UAE's regulated Open Finance infrastructure. Secure, consent-driven, CBUAE compliant. The approved sentence: Connect your Account via AL TAREQ and start transacting.</em></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentGatewayClient;
