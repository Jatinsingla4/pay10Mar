"use client";

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

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

      <section className={Style.centered_text_section}>
        <div className={Style.centered_container}>
          <h2 className={Style.centered_heading}>
            Two powerful ways,<br/>your customers pay online.
          </h2>
          <p className={Style.centered_paragraph}>
            Add Pay10's payment methods to your checkout in minutes: a Dynamic QR button and a Pay by Bank option, giving your customers the fastest, most trusted ways to pay online in the UAE.
          </p>
        </div>
      </section>

      <section className={Style.showcase_section}>
        <div className={Style.showcase_wrapper}>
          <div className={Style.showcase_item}>
            <div className={Style.phone_wrapper}>
              <Image
                src="/images/prod_imports/pg-pay-mobile.png"
                alt="Pay10 App on Phone"
                width={300}
                height={600}
                className={Style.showcase_phone_img}
              />
            </div>
            <div className={`${Style.checkout_card} ${Style.showcase_card_overlay}`}>
              <div className={Style.mockup_header}>
                <Icon icon="mdi:cart-outline" width={20} /> Your Online Checkout
              </div>
              <div className={Style.mockup_total}>
                <span>Order total</span>
                <strong>AED 349.00</strong>
              </div>
              <div className={Style.mockup_divider}>Choose payment method</div>
              <button className={Style.mockup_pay10_btn}>
                <Icon icon="mdi:cellphone" width={18} /> Pay with Pay10
              </button>
              <p className={Style.mockup_hint}>&uarr; Customer clicks this button on your checkout</p>
            </div>
          </div>

          <div className={Style.showcase_item}>
            <div className={Style.phone_wrapper}>
              <Image
                src="/images/prod_imports/pg-pay-bank.png"
                alt="Bank App on Phone"
                width={300}
                height={600}
                className={Style.showcase_phone_img}
              />
            </div>
            <div className={`${Style.checkout_card} ${Style.showcase_card_overlay}`}>
              <div className={Style.mockup_header}>
                <Icon icon="mdi:cart-outline" width={20} /> Your Online Checkout
              </div>
              <div className={Style.mockup_total}>
                <span>Order total</span>
                <strong>AED 349.00</strong>
              </div>
              <div className={Style.mockup_divider}>Choose payment method</div>
              <button className={Style.mockup_bank_btn}>
                <Icon icon="mdi:bank-outline" width={18} /> Pay by Bank
              </button>
              <p className={Style.mockup_hint}>&uarr; Customer clicks this button on your checkout</p>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.journey_cards_section}>
        <div className={Style.journey_cards_wrapper}>
          {/* Card 1 */}
          <div className={`${Style.journey_card} ${Style.card_white}`}>
            <div className={Style.journey_card_img}>
              <img src="/images/prod_imports/pg-pay-qr.png" alt="Pay with Pay10 QR" />
            </div>
            <div className={Style.card_header}>
              <h3>Pay with Pay10</h3>
              <span className={Style.card_badge}>APM &middot; Dynamic QR</span>
            </div>
            <p className={Style.card_desc}>
              Customer scans a Dynamic QR code to pay: directly from their Pay10 UAE App.
            </p>
            
            <div className={Style.card_list_section}>
              <h4 className={Style.list_heading}>
                <Icon icon="mdi:bullseye-arrow" className={Style.list_icon} /> Customer checkout journey
              </h4>
              <ul className={Style.journey_card_list}>
                <li>
                  <span className={Style.step_num}>1</span>
                  <span>Clicks "Pay with Pay10": a Dynamic QR code is instantly generated on screen.</span>
                </li>
                <li>
                  <span className={Style.step_num}>2</span>
                  <span>Opens Pay10 UAE App, scans the Dynamic QR code with their phone.</span>
                </li>
                <li>
                  <span className={Style.step_num}>3</span>
                  <span>Confirms payment: amount and merchant name shown in app before confirming.</span>
                </li>
                <li>
                  <span className={Style.step_num}>4</span>
                  <span>Payment confirmed: order confirmed on your checkout. Instant. Done.</span>
                </li>
              </ul>
            </div>

            <div className={Style.card_footer}>
              Customer doesn't have Pay10 UAE App? They're directed to download it, turning your checkout into a Pay10 acquisition moment.
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${Style.journey_card} ${Style.card_tinted}`}>
            <div className={Style.journey_card_img}>
              <img src="/images/prod_imports/pg-pay-desktop.png" alt="Pay by Bank Desktop" />
            </div>
            <div className={Style.card_header}>
              <h3>Pay by Bank</h3>
              <span className={Style.card_badge}>TPP &middot; Open Finance &middot; Al Tareq</span>
            </div>
            <p className={Style.card_desc}>
              Customer pays directly from their bank account: no card, no wallet, just their bank.
            </p>
            
            <div className={Style.card_list_section}>
              <h4 className={Style.list_heading}>
                <Icon icon="mdi:bank-circle" className={Style.list_icon} /> Customer checkout journey
              </h4>
              <ul className={Style.journey_card_list}>
                <li>
                  <span className={Style.step_num}>1</span>
                  <span>Clicks "Pay by Bank": redirected to securely connect to their bank.</span>
                </li>
                <li>
                  <span className={Style.step_num}>2</span>
                  <span>Authorizes payment within their bank's secure environment.</span>
                </li>
                <li>
                  <span className={Style.step_num}>3</span>
                  <span>Returns to checkout.</span>
                </li>
                <li>
                  <span className={Style.step_num}>4</span>
                  <span>Payment confirmed: order confirmed on your checkout. Instant. Done.</span>
                </li>
              </ul>
            </div>

            <div className={Style.card_footer}>
              Powered by Al Tareq: the UAE's regulated Open Finance infrastructure. Secure, consent-driven, CBUAE compliant. <strong>The approved sentence: Connect your Account via AL TAREQ and start transacting.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.centered_text_section}>
        <div className={Style.centered_container}>
          <h2 className={Style.centered_heading}>
            From checkout button to confirmed order,<br/>here's exactly what happens.
          </h2>
          <p className={Style.centered_paragraph}>
            Two different journeys. The same outcome: a completed payment, settled to your account today.
          </p>
        </div>
      </section>

      <section className={Style.journey_list_section}>
        <div className={Style.journey_list_wrapper}>
          {/* DQR Journey */}
          <div className={Style.journey_column}>
            <h3 className={Style.journey_col_heading}>PAY WITH PAY10: DQR JOURNEY</h3>
            <div className={Style.journey_steps}>
              
              <div className={Style.step_item}>
                <div className={Style.step_number}>1</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Button appears at checkout</div>
                  <div className={Style.step_desc}>
                    "Pay with Pay10" button sits alongside your existing payment options: card, COD, or other APMs.
                  </div>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>2</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Dynamic QR generated</div>
                  <div className={Style.step_desc}>
                    Unique QR code created for this transaction: amount pre-filled, merchant name shown. No manual entry.
                  </div>
                  <span className={Style.step_tag}>Instant generation</span>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>3</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Customer scans with Pay10 UAE App</div>
                  <div className={Style.step_desc}>
                    Opens Pay10 UAE App, scans QR: payment details shown for confirmation. One tap to pay.
                  </div>
                  <span className={Style.step_tag}>Under 10 seconds</span>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>4</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Order confirmed: settlement today</div>
                  <div className={Style.step_desc}>
                    Payment posted to your merchant portal instantly. Settlement to your account the same day.
                  </div>
                  <span className={Style.step_tag}>T+0 settlement</span>
                </div>
              </div>

            </div>
          </div>

          {/* TPP Journey */}
          <div className={Style.journey_column}>
            <h3 className={Style.journey_col_heading}>PAY BY BANK: TPP JOURNEY</h3>
            <div className={Style.journey_steps}>
              
              <div className={Style.step_item}>
                <div className={Style.step_number}>1</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Button appears at checkout</div>
                  <div className={Style.step_desc}>
                    "Pay by Bank" button sits at the checkout: clear, trusted, no card details needed.
                  </div>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>2</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Directed to Al Tareq</div>
                  <div className={Style.step_desc}>
                    Customers land on Al Tareq's Open Finance screen, selects their UAE bank from the list.
                  </div>
                  <span className={Style.step_tag}>Secure redirect</span>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>3</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Bank authentication</div>
                  <div className={Style.step_desc}>
                    Customers redirected to their bank, approves the payment using their existing banking credentials.
                  </div>
                  <span className={Style.step_tag}>Bank-level security</span>
                </div>
              </div>

              <div className={Style.step_item}>
                <div className={Style.step_number}>4</div>
                <div className={Style.step_content}>
                  <div className={Style.step_title}>Order confirmed: settlement today</div>
                  <div className={Style.step_desc}>
                    Payment confirmed, customer returned to your checkout. Settlement to your account the same day.
                  </div>
                  <span className={Style.step_tag}>T+0 settlement</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className={Style.benefits_section}>
        <div className={Style.centered_container}>
          <h2 className={Style.centered_heading}>
            Every Pay10 merchant gets the same unbeatable deal.
          </h2>
          <p className={Style.centered_paragraph}>
            The benefits below apply to every merchant using Pay10's Payment Gateway, regardless of size, volume, or industry.
          </p>
        </div>

        <div className={Style.benefits_grid_wrapper}>
          <div className={Style.benefits_grid}>
            
            <div className={Style.benefit_col}>
              <div className={Style.benefit_icon_wrapper}>
                <Icon icon="mdi:percent-outline" className={Style.benefit_icon} />
              </div>
              <h4 className={Style.benefit_title}>01 Lowest MDR</h4>
              <p className={Style.benefit_desc}>The lowest transaction fees on the UAE market. Keep more of every sale.</p>
            </div>

            <div className={Style.benefit_col}>
              <div className={Style.benefit_icon_wrapper}>
                <Icon icon="mdi:clock-fast" className={Style.benefit_icon} />
              </div>
              <h4 className={Style.benefit_title}>02 Same-day settlement</h4>
              <p className={Style.benefit_desc}>T+0. Your working capital is available the day you earn it. Always.</p>
            </div>

            <div className={Style.benefit_col}>
              <div className={Style.benefit_icon_wrapper}>
                <Icon icon="mdi:eye-outline" className={Style.benefit_icon} />
              </div>
              <h4 className={Style.benefit_title}>03 No hidden fees</h4>
              <p className={Style.benefit_desc}>Complete visibility. Zero surprises. What you see is exactly what you pay.</p>
            </div>

            <div className={Style.benefit_col}>
              <div className={Style.benefit_icon_wrapper}>
                <Icon icon="mdi:shield-check-outline" className={Style.benefit_icon} />
              </div>
              <h4 className={Style.benefit_title}>04 CBUAE Licensed</h4>
              <p className={Style.benefit_desc}>Four Central Bank licences. A fully regulated financial partner.</p>
            </div>

            <div className={Style.benefit_col}>
              <div className={Style.benefit_icon_wrapper}>
                <Icon icon="mdi:headset" className={Style.benefit_icon} />
              </div>
              <h4 className={Style.benefit_title}>05 24/7 Human support</h4>
              <p className={Style.benefit_desc}>Call. A human picks up. Multi-language. Zero wait. Every time.</p>
            </div>

          </div>
        </div>
      </section>

      <section className={Style.biz_final_cta}>
        <p className={Style.cta_sub}>
          Pay10 has the in-house expertise and capability to build custom integrations for enterprise clients: tailored to your ERP, your data architecture, and your operational structure. If your business has complex requirements, our enterprise team is ready to scope it with you.
        </p>
        <div className={Style.cta_buttons}>
          <Link href="/contact-us?type=Enterprise+Sales" className={Style.cta_btn_primary}>Enterprise Sales</Link>
        </div>
      </section>

      <section className={Style.biz_app_download}>
        <h2 className={Style.app_download_heading}>Merchant App</h2>
        <div className={Style.app_download_badges}>
          <a href="#" className={Style.app_badge} aria-label="Download on the App Store">
            <Icon icon="ic:baseline-apple" width={28} />
            <div>
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="#" className={Style.app_badge} aria-label="Get it on Google Play">
            <Icon icon="logos:google-play-icon" width={24} />
            <div>
              <span>GET IT ON</span>
              <strong>Google Play</strong>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
};

export default PaymentGatewayClient;
