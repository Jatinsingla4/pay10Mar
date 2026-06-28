"use client";

import Style from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import MerchantTestimonialVideos from "../components/ui/MerchantTestimonialVideos";
import MerchantLogosCTA from "../components/ui/MerchantLogosCTA";

const MerchantAppClient = () => {
  return (
    <main>
      <section className={Style.biz_hero}>
        <div className={Style.biz_hero_text}>
          <h2>Every dirham you earn, settled today.</h2>
          <p>Pay10 UAE Biz App is built for every merchant in the UAE: micro, SME, and enterprise. Lowest transaction fees. Same-day settlement. 24/7 multi-language, human support. Licensed by the Central Bank of the UAE.</p>
        </div>
      </section>

      <section className={Style.merchant_scale}>
        <div className={Style.merchant_scale_header}>
          <h2>Built for every merchant, from first sale to full scale.</h2>
          <p>Whether you&apos;re a solo trader, a growing SME, or a multi-location enterprise Pay10 UAE Biz App levels the playing field. The same powerful platform. The same unbeatable rates. For everyone.</p>
        </div>
        <div className={Style.merchant_scale_cards}>
          {[
            {
              num: '01',
              title: 'Micro Merchant',
              sub: 'Starting out or going solo',
              desc: 'Single location, lower transaction volumes. Pay10 gives micro merchants the same tools and rates that only big players used to get.',
              tags: ['Street vendors', 'Solo traders', 'Home businesses', 'Market stalls'],
            },
            {
              num: '02',
              title: 'Growing businesses',
              sub: null,
              desc: 'Multi-cashier, real-time reporting, instant settlement. Everything an SME needs to manage payments and cash flow without a finance team.',
              tags: ['Retail stores', 'Restaurants', 'Salons', 'Clinics', 'Service Businesses'],
            },
            {
              num: '03',
              title: 'Multi-location. Complex operations.',
              sub: null,
              desc: 'Fleet management, hierarchy controls, analytics at scale. Pay10 handles enterprise payment infrastructure across locations, teams, and transaction volumes.',
              tags: ['Retail chains', 'Hotels', 'Education groups', 'Healthcare networks', 'Government'],
            },
          ].map((card) => (
            <div key={card.num} className={Style.merchant_scale_card}>
              <span className={Style.card_num}>{card.num}</span>
              <h3>{card.title}</h3>
              {card.sub && <p className={Style.card_sub}>{card.sub}</p>}
              <p className={Style.card_desc}>{card.desc}</p>
              <div className={Style.card_tags}>
                {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>What Pay10 merchants get that others don&apos;t.</h2>
          <p>Five benefits that change how you run your business and why merchants across the UAE are switching to Pay10.</p>
        </div>
        <div className={Style.benefits_grid}>
          {[
            {
              num: '01',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
              title: 'Lowest MDR in the UAE market',
              sub: 'Keep more of every dirham you earn.',
              desc: 'Pay10 offers the lowest Merchant Discount Rate in the UAE market, so your transaction fees stop eating into your margins. Every sale, every day, you keep more.',
            },
            {
              num: '02',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
              title: 'Same-day instant settlement',
              sub: 'Your money on the day you earn it, not days later.',
              desc: 'Pay10 is the first to offer instant same-day settlement to all merchants, micro to enterprise. Your working capital is available the same day. No T+1. No T+2. Never.',
            },
            {
              num: '03',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l7 4v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
              title: 'Complete security, no hidden fees',
              sub: 'What you see is what you pay. Always.',
              desc: 'Full transaction visibility, zero hidden charges, and PCI DSS Level 1 certified security across every payment. You know exactly what\'s happening with your money at all times.',
            },
            {
              num: '04',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
              title: 'Licensed by the Central Bank of the UAE',
              sub: 'Your business deserves a regulated partner.',
              desc: 'Pay10 holds four CBUAE licences: SVF, RPS-II, Open Finance, and Category 4 Remittance. You\'re not just using a business payments app. You\'re working with a fully regulated financial institution.',
            },
          ].map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={Style.benefit_sub}>{item.sub}</p>
              <p className={Style.benefit_desc}>{item.desc}</p>
              <span className={Style.benefit_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>
      <section className={Style.biz_support}>
        <div className={Style.support_left}>
          <h2>24/7 human support · multi-language · zero wait time</h2>
          <p className={Style.support_sub}>Call. A human picks up. Every time.</p>
          <p className={Style.support_desc}>In a world of bots and long waits, Pay10 is different. Human support, available 24 hours a day, 7 days a week, 365 days a year, in multiple languages. For every merchant, regardless of size. Call and your call will be picked up. No queues. No bots. No waiting.</p>
        </div>
        <div className={Style.support_visual}>
          <div className={Style.circle_outer}>
            <div className={Style.circle_mid}>
              <div className={Style.circle_inner}>
                <Image src="/images/prod_imports/customer-executive.jpg" alt="Pay10 support" width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.biz_command}>
        <h2 className={Style.command_heading}>Everything you need to run your payments,<br />in one app.</h2>
        <div className={Style.command_body}>
          <div className={Style.command_phones}>
            <Image src="/images/prod_imports/biz-home-screen.png" alt="Pay10 Biz App Home" width={280} height={560} className={Style.phone_img_back} />
            <Image src="/images/prod_imports/biz-transaction-history.png" alt="Pay10 Biz App Transactions" width={280} height={560} className={Style.phone_img_front} />
          </div>
          <div className={Style.command_right}>
            <p className={Style.command_desc}>The Pay10 Biz UAE App is your merchant command centre linked directly to your DQR device, giving you real-time visibility and full control from your phone.</p>
            <div className={Style.command_features}>
              {[
                { num: '01', title: 'Transaction data live', desc: 'See every transaction in real time, every amount, every method, every status, cashier. Full history, always accessible.' },
                { num: '02', title: 'Balance visibility', desc: 'See your settled and unsettled balance at a glance. Know your cash flow position before you need it.' },
                { num: '03', title: 'Refunds', desc: 'Process refunds directly from the app. Fast, clean, no paperwork, no calls to the bank.' },
                { num: '04', title: 'Link / unlink DQR devices', desc: 'Connect or disconnect your DQR POS machine directly from the app. Full device control in your hands.' },
              ].map((f) => (
                <div key={f.num} className={Style.command_feature}>
                  <p className={Style.feature_title}>{f.title}</p>
                  <p className={Style.feature_desc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={Style.biz_steps}>
        <div className={Style.steps_header}>
          <h2 className={Style.steps_heading}>Up and running in 5 simple steps.</h2>
          <p className={Style.steps_sub}>Getting Pay10 Business Solutions: POS DQR Devices, Pay10 Biz UAE App and much more, at your premises is straightforward. Our team handles the heavy lifting. You focus on your business.</p>
        </div>
        <div className={Style.steps_row}>
          {[
            { num: '01', title: 'Contact our team', desc: 'SME or Enterprise, email the right team and we respond fast.' },
            { num: '02', title: 'Business registration', desc: 'Our team onboards your business onto the Pay10 platform.' },
            { num: '03', title: 'Receive credentials', desc: 'Your Pay10 Biz UAE App login credentials are sent to you.' },
            { num: '04', title: 'DQR device delivered', desc: 'Your DQR POS machine is delivered and installed at your premises by our team.' },
            { num: '05', title: 'Start accepting', desc: 'Login, link your device, and start accepting payments instantly.' },
          ].map((step, i, arr) => (
            <div key={step.num} className={Style.step_item}>
              <div className={Style.step_num_wrap}>
                <span className={Style.step_num}>{step.num}</span>
              </div>
              <h3 className={Style.step_title}>{step.title}</h3>
              <p className={Style.step_desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <MerchantTestimonialVideos />
      <MerchantLogosCTA showCta={false} />

      <section className={Style.biz_final_cta}>
        <h2 className={Style.cta_heading}>Ready to accept payments<br />the smarter way?</h2>
        <p className={Style.cta_sub}>Lowest MDRs. Same-day settlement. 24/7 human support. CBUAE licensed. Everything your business deserves, and nothing you don&apos;t need.</p>
        <div className={Style.cta_buttons}>
          <Link href="/contact-us?type=SME+Sales" className={Style.cta_btn_primary}>SME Sales</Link>
          <Link href="/contact-us?type=Enterprise+Sales" className={Style.cta_btn_outline}>Enterprise Sales</Link>
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

export default MerchantAppClient;
