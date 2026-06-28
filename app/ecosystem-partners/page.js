import React from "react";
import { Icon } from '@iconify/react';
import styles from "./ecosystem.module.scss";
import PartnerForm from "./PartnerForm";

export const metadata = {
  title: "Channel Partners - Pay 10",
  description: "Unlock new revenue by adding Pay10's payment methods to your platform.",
  alternates: {
    canonical: "https://pay10.ae/ecosystem-partners",
  },
};

export default function EcosystemPartnersPage() {
  return (
    <main className={styles.ecosystem}>
      <section className={styles.altareq_section}>
        <div className={styles.altareq_hero}>
          <div className={styles.altareq_hero_text}>
            <h2>Partner with Pay10.<br/>Grow faster. Earn more.</h2>
            <p>
              Unlock new revenue by adding Pay10's payment methods to your platform. One integration. Thousands of merchant opportunities. Backed by the UAE's most complete fintech ecosystem : licensed by the Central Bank of the UAE.
            </p>
          </div>
        </div>
      </section>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="pay10-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8105" />
            <stop offset="100%" stopColor="#ffb020" />
          </linearGradient>
        </defs>
      </svg>

      <section className={styles.reasons_section}>
        <div className={styles.reasons_header}>
          <h2>Three reasons to partner with Pay10</h2>
        </div>
        <div className={styles.reasons_grid}>
          <div className={styles.reason_card}>
            <Icon icon="mdi:trending-up" className={styles.reason_icon} />
            <h3>Earn More</h3>
            <p className={styles.reason_desc}>Attractive commissions and recurring revenue on every merchant you bring to Pay10 : building a revenue stream that grows as your merchants grow.</p>
            <ul>
              <li>Commission on merchant onboarding</li>
              <li>Recurring revenue on transaction volume</li>
              <li>Transparent partner revenue structure</li>
              <li>Revenue grows as your merchant base grows</li>
            </ul>
          </div>
          
          <div className={styles.reason_card}>
            <Icon icon="mdi:rocket-launch-outline" className={styles.reason_icon} />
            <h3>Grow Faster</h3>
            <p className={styles.reason_desc}>Expand your product portfolio instantly : without building anything from scratch. Add Pay10's full payment suite to what you already offer merchants.</p>
            <ul>
              <li>Add UAE-native payment methods to your checkout</li>
              <li>Offer DQR in-person payment devices</li>
              <li>Differentiate with Pay10's Open Finance capabilities</li>
              <li>Single integration : all products activated at once</li>
            </ul>
          </div>

          <div className={styles.reason_card}>
            <Icon icon="mdi:shield-check-outline" className={styles.reason_icon} />
            <h3>Partner with Confidence</h3>
            <p className={styles.reason_desc}>Dedicated onboarding, training, marketing support, and account management : Pay10 treats every Tech Partner as a long-term growth relationship.</p>
            <ul>
              <li>Dedicated partner onboarding team</li>
              <li>Technical integration support end-to-end</li>
              <li>Co-marketing and joint go-to-market support</li>
              <li>Named account manager : always available</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2>One integration.<br/>Every Pay10 merchant opportunity.</h2>
          <p>
            As a Tech Partner you integrate once with Pay10's API : then any merchant on your platform who wants Pay10 as a payment method signs up through you. Pay10 handles their onboarding. You earn on every one.
            <br/><br/>
            <strong>Portal access:</strong> Tech Partners receive dedicated merchant portal access : giving you full visibility of your connected merchants' activity, settlements, and performance from one dashboard.
          </p>
        </div>
        <div className={styles.benefits_grid}>
          {[
            {
              num: '01',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
              title: 'Single API integration',
              desc: 'You integrate Pay10 once : all payment methods, all products, activated through one connection.',
            },
            {
              num: '02',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
              title: 'Merchants opt in',
              desc: 'Any merchant on your platform who wants Pay10 signs up through your Tech Partner channel.',
            },
            {
              num: '03',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
              title: 'Pay10 onboards them',
              desc: 'Pay10\'s team handles full merchant onboarding : credentials, setup, devices, and portal access.',
            },
            {
              num: '04',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>,
              title: 'You earn and manage',
              desc: 'You access the merchant portal to monitor activity. Commission flows as your merchants transact.',
            },
          ].map((item) => (
            <div key={item.num} className={styles.benefit_card}>
              <span className={styles.benefit_num}>{item.num}</span>
              <div className={styles.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={styles.benefit_desc}>{item.desc}</p>
              <span className={styles.benefit_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reasons_section}>
        <div className={styles.reasons_header} style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <h2>Security and licensing : partner with a platform you can trust</h2>
        </div>
        <div className={styles.reasons_grid}>
          <div className={styles.reason_card}>
            <Icon icon="mdi:bank-outline" className={styles.reason_icon} />
            <h3>4 CBUAE licences</h3>
            <p className={styles.reason_desc}>SVF &middot; RPS-II &middot; Open Finance &middot; Category 4 Remittance. The most complete regulatory stack of any UAE fintech. Your merchants are in safe, regulated hands.</p>
          </div>
          
          <div className={styles.reason_card}>
            <Icon icon="mdi:shield-lock-outline" className={styles.reason_icon} />
            <h3>PCI DSS Level 1 + SOC 2 Type II</h3>
            <p className={styles.reason_desc}>The highest global standards for payment security and data protection. Every transaction certified, audited, and protected : giving your merchants and their customers full confidence.</p>
          </div>

          <div className={styles.reason_card}>
            <Icon icon="mdi:flag-outline" className={styles.reason_icon} />
            <h3>UAE National Policy aligned</h3>
            <p className={styles.reason_desc}>Pay10 is aligned with the UAE's National Policy on Open Finance driven by CBUAE : meaning every partnership is future-proofed against the direction of UAE financial regulation.</p>
          </div>
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2>What your merchants get : the full Pay10 ecosystem</h2>
          <p>
            The most complete fintech ecosystem in the UAE behind one API.
            <br/><br/>
            When you partner with Pay10, your merchants access a complete end-to-end financial platform : consumer solutions, merchant tools, DQR hardware, and payment gateway capabilities all under four CBUAE licences.
          </p>
        </div>
        <div className={styles.benefits_grid}>
          {[
            {
              num: '01',
              icon: <Icon icon="mdi:account-group-outline" width={28} />,
              title: 'Consumer solutions',
              sub: 'Pay10 UAE App',
              bullets: [
                'Scan & Pay with DQR devices',
                'Send to mobile number',
                'Bank transfers via IBAN',
                'Send Abroad',
                'Bill payments',
                'Pay10 Card (Jaywan)'
              ]
            },
            {
              num: '02',
              icon: <Icon icon="mdi:storefront-outline" width={28} />,
              title: 'Merchant solutions',
              sub: 'Pay10 Biz App + Portal',
              bullets: [
                'Micro - SME - Enterprise',
                'Instant same-day settlement',
                'Lowest MDR in UAE',
                'Transaction data + VAT reports',
                'Refunds + device management',
                'ERP API integration'
              ]
            },
            {
              num: '03',
              icon: <Icon icon="mdi:calculator-variant-outline" width={28} />,
              title: 'DQR devices',
              sub: "UAE's first DQR family",
              bullets: [
                'POS10 counter terminal',
                'P5 premium tabletop',
                'P10 mobile / delivery',
                'Dynamic QR per transaction',
                'Sound box confirmation',
                'OTA updates + fleet mgmt'
              ]
            },
            {
              num: '04',
              icon: <Icon icon="mdi:web" width={28} />,
              title: 'Payment gateway',
              sub: 'Online checkout APMs',
              bullets: [
                'Pay with Pay10 (DQR)',
                'Pay by Bank (Al Tareq TPP)',
                'REST API + webhooks',
                'ERP-ready data format',
                'Custom enterprise builds',
                'Sandbox + full docs'
              ]
            }
          ].map((item) => (
            <div key={item.num} className={styles.benefit_card}>
              <span className={styles.benefit_num}>{item.num}</span>
              <div className={styles.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              {item.sub && <p className={styles.benefit_sub}>{item.sub}</p>}
              {item.desc && <p className={styles.benefit_desc}>{item.desc}</p>}
              {item.bullets && (
                <ul className={styles.benefit_bullets}>
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.apply_section}>
        <div className={styles.apply_container}>
          <div className={styles.apply_left}>
            <span className={styles.apply_eyebrow}>Tech Partner programme &middot; Apply now</span>
            <h2>Ready to grow with Pay10?</h2>
            <p>
              Fill in the form and our partnerships team will be in touch within one business day to discuss the integration, the commercial model, and your merchant opportunity.
            </p>
            <ul className={styles.apply_bullets}>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Single API integration, all Pay10 products activated
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Merchant portal access for full visibility
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Commission on every merchant you bring
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Dedicated technical integration support
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Co-marketing and go-to-market support
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Named account manager from day one
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                Access to UAE's most complete fintech ecosystem
              </li>
              <li>
                <Icon icon="mdi:check" className={styles.check_icon} />
                4 CBUAE licences behind every partnership
              </li>
            </ul>
          </div>
          
          <div className={styles.apply_right}>
            <PartnerForm />
          </div>
        </div>
      </section>
    </main>
  );
}
