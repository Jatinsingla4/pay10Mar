import React from "react";
import Link from 'next/link';
import styles from "./wps.module.scss";
import { Icon } from "@iconify/react";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";

export const metadata = {
  title: "WPS & Payroll – Pay 10",
  description: "UAE's seamless solution for salary compliance.",
  alternates: {
    canonical: "https://pay10.ae/wps-payroll",
  },
};

const WpsPayrollPage = () => {
  return (
    <main className={styles.wps}>
      {/* Hero Banner Section */}
      <section className={styles.altareq_section}>
        <div className={styles.altareq_hero}>
          <div className={styles.altareq_hero_content}>
            <h1>
              UAE's seamless solution for<br />
              salary compliance.
            </h1>
            <p>
              Pay all your employees' salaries digitally: compliant, scalable, and fully powered by Pay10. A CBUAE-licensed WPS provider built for every type of UAE employer and every type of UAE employee.
            </p>
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={<span className={styles.gradient_heading}>What is the Wage Protection System (WPS)?</span>}
        subheading={<span className={styles.grey_text}>The Wage Protection System (WPS) is a UAE government mandate managed by the Central Bank of the UAE (CBUAE). It requires every employer in the UAE: across all industries, for all workers, blue collar and white collar: to process salaries digitally through a CBUAE-licensed provider. The system verifies that every employee is paid what their labour contract says, and that they are paid on time. Non-compliance carries significant penalties. Pay10 is a fully licensed WPS provider: meaning every salary processed through Pay10 satisfies this mandate completely.</span>}
        imageSrc="/images/prod_imports/wps-labor-bubble.png"
        imageAlt="Wage Protection System"
        isReversed={false}
        isGreyBg={true}
      />

      <section className={styles.who_is_for_section}>
        <div className={styles.who_container}>
          <h2 className={styles.section_title}>Who is This For?</h2>
          
          <div className={styles.who_grid}>
            {/* Employers Column */}
            <div className={styles.who_col}>
              <h3>For employers</h3>
              <p>
                One WPS solution for all your payroll needs. From SMEs with 10 staff to enterprises with thousands: Pay10 handles it all, compliantly.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Fully CBUAE-licensed WPS salary disbursement</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Upload SIF file: Pay10 processes instantly</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> IBAN transfers for banked employees</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Universal Account setup for unbanked workers</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Analytics dashboard: full payroll visibility</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Reduced admin effort and paperwork</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Transparent fee structure: no surprises</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Smooth migration from existing payroll cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Full regulatory compliance with new CBUAE WPS framework</li>
              </ul>
            </div>

            {/* Employees Column */}
            <div className={styles.who_col}>
              <h3>For employees</h3>
              <p>
                A universal account and everything they need to use it. Banked or unbanked: every employee gets full access to their salary digitally.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Universal Account: works for banked and unbanked workers</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Jaywan card: ATM withdrawals, POS purchases, digital transactions</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay10 UAE App: full digital access to salary and account</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Scan and pay at merchants across all 7 Emirates</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Send money internationally to family back home</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay bills: utilities, telecom, transport, gift cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Card management in-app: limits, freeze, cancel</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> IBAN transfers: send to any UAE bank account</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2>What Pay10 WPS offers</h2>
          <div className={styles.pill_group}>
            <span className={styles.pill_gradient}><Icon icon="mdi:shield-check-outline" className={styles.pill_icon}/> CBUAE licensed WPS provider</span>
            <span className={styles.pill_gradient}><Icon icon="mdi:credit-card-outline" className={styles.pill_icon}/> Jaywan card for every employee</span>
            <span className={styles.pill_gradient}><Icon icon="mdi:cellphone" className={styles.pill_icon}/> Pay10 UAE App included</span>
            <span className={styles.pill_gradient}><Icon icon="mdi:headset" className={styles.pill_icon}/> 24/7 human support</span>
          </div>
        </div>
        <div className={styles.benefits_grid}>
          {[
            {
              num: '01',
              icon: <Icon icon="mdi:bank-outline" width={28} />,
              title: 'Fully CBUAE licensed',
              desc: 'CBUAE-licensed WPS provider enabling secure, compliant, and fully digital salary processing: aligned with the new WPS framework.',
            },
            {
              num: '02',
              icon: <Icon icon="mdi:bank-transfer" width={28} />,
              title: 'Secure salary transfers',
              desc: 'IBAN-based transfers for banked employees. Universal Account for unbanked and blue-collar workers: safe, instant, every salary run.',
            },
            {
              num: '03',
              icon: <Icon icon="mdi:credit-card" width={28} />,
              title: 'Jaywan card services',
              desc: 'Jaywan card issued to every unbanked employee: linked to their Universal Account for ATM withdrawals, POS purchases, and digital payments.',
            },
            {
              num: '04',
              icon: <Icon icon="mdi:cellphone-check" width={28} />,
              title: 'Pay10 UAE App',
              desc: 'Full digital access for blue-collar employees to their Universal Account: view balance, pay bills, scan and pay, send money, manage their card.',
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

      <section className={styles.who_is_for_section}>
        <div className={styles.who_container}>
          <h2 className={styles.section_title}>Banked vs Unbanked Worker Journeys</h2>
          
          <div className={styles.who_grid}>
            {/* Banked Employees Column */}
            <div className={styles.who_col}>
              <h3>Banked employees</h3>
              <p>
                Salary straight to their existing bank account. White-collar, salaried, already banked: Pay10 handles WPS compliance without changing how they receive their salary.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Salary transferred directly to their existing UAE IBAN</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> No new account needed: seamless for the employee</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> WPS compliance handled entirely by Pay10</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Optional Pay10 UAE App for additional financial features</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Employer's WPS obligation fully satisfied</li>
              </ul>
            </div>

            {/* Unbanked Employees Column */}
            <div className={styles.who_col}>
              <h3>Unbanked employees</h3>
              <p>
                A named IBAN, a Jaywan card, and a full financial life. Blue-collar, sub-5K AED workers often invisible to the banking system. Pay10 changes that permanently.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Named Pay10 IBAN Universal Account, theirs forever</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Jaywan debit card: ATM, POS, online transactions</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay10 UAE App: balance, transfers, scan and pay</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Send money home: international transfers in app</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay bills: utilities, telecom, transport, gift cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> No more anonymous salary cards with no name attached</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.steps_section}>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <linearGradient id="pay10_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFBB07" />
            <stop offset="100%" stopColor="#EF1A23" />
          </linearGradient>
        </svg>
        <div className={styles.steps_container}>
          <div className={styles.steps_header}>
            <h2>Getting started: 6 simple steps</h2>
            <p>Simple onboarding. Faster than you think.</p>
          </div>
          
          <div className={styles.steps_grid}>
            {[
              { num: '01', title: 'Registration', desc: 'Employers submit onboarding documents and employee data to Pay10.', icon: 'mdi:file-document-edit-outline' },
              { num: '02', title: 'Account creation', desc: 'Universal Accounts are set up for unbanked employees by the Pay10 team.', icon: 'mdi:account-plus-outline' },
              { num: '03', title: 'Card issuance', desc: 'Jaywan cards are issued to unbanked employees and linked to their Universal Account.', icon: 'mdi:credit-card-plus-outline' },
              { num: '04', title: 'App activation', desc: 'Employees download the Pay10 UAE App to access their account, view balance, and manage transactions.', icon: 'mdi:cellphone-check' },
              { num: '05', title: 'First salary run', desc: 'The employer uploads the SIF file and transfers funds. Pay10 processes the salary instantly.', icon: 'mdi:cash-fast' },
              { num: '06', title: 'Ongoing management', desc: 'Employers manage payroll through the analytics dashboard with full visibility and 24/7 support.', icon: 'mdi:chart-line' }
            ].map((step, index) => (
              <div key={index} className={styles.step_card}>
                <div className={styles.step_icon_wrapper}>
                  <Icon icon={step.icon} className={styles.step_icon} />
                </div>
                <h3><span>{step.num}</span> {step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparison_section}>
        <div className={styles.comparison_container}>
          <div className={styles.comparison_header}>
            <h2>Competitive comparison</h2>
            <p>Pay10 is competing against exchange houses and established salary card providers. This table makes the case without naming anyone directly.</p>
          </div>

          <div className={styles.table_responsive}>
            <table className={styles.compare_table}>
              <thead>
                <tr>
                  <th>What matters</th>
                  <th>Traditional WPS providers</th>
                  <th className={styles.highlight_col}>Pay10 WPS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'CBUAE licensed',
                    trad: { type: 'check', text: 'Most are' },
                    pay10: { type: 'check', text: 'Fully licensed 4 CBUAE licences' }
                  },
                  {
                    feature: 'Named IBAN per worker',
                    trad: { type: 'cross', text: 'Generic salary card no name' },
                    pay10: { type: 'check', text: 'Every worker gets a named Pay10 IBAN' }
                  },
                  {
                    feature: 'Unbanked worker account',
                    trad: { type: 'cross', text: 'Anonymous card only' },
                    pay10: { type: 'check', text: 'Named Universal Account fully theirs' }
                  },
                  {
                    feature: 'Mobile invitation flow',
                    trad: { type: 'cross', text: 'Worker must visit a branch' },
                    pay10: { type: 'check', text: 'SMS invite register from any phone' }
                  },
                  {
                    feature: 'Debit card for workers',
                    trad: { type: 'text', text: 'Salary card only limited use' },
                    pay10: { type: 'check', text: 'Jaywan debit card ATM, POS, online' }
                  },
                  {
                    feature: 'Employee app',
                    trad: { type: 'cross', text: 'None or basic' },
                    pay10: { type: 'check', text: 'Pay10 UAE App full financial control' }
                  },
                  {
                    feature: 'International transfers',
                    trad: { type: 'text', text: 'Separate service extra fees' },
                    pay10: { type: 'check', text: 'Built into Pay10 app Send Abroad' }
                  },
                  {
                    feature: 'Bill payments',
                    trad: { type: 'cross', text: 'Not offered' },
                    pay10: { type: 'check', text: 'All UAE bills in one app' }
                  },
                  {
                    feature: '24/7 human support',
                    trad: { type: 'text', text: 'Limited often bots or queues' },
                    pay10: { type: 'check', text: 'Human, multi-language, zero wait' }
                  },
                  {
                    feature: 'Employer WPS portal',
                    trad: { type: 'text', text: 'Basic SIF upload minimal visibility' },
                    pay10: { type: 'check', text: 'Full analytics dashboard + payroll history' }
                  },
                  {
                    feature: 'Open Finance',
                    trad: { type: 'cross', text: 'Not available' },
                    pay10: { type: 'check', text: 'Licensed for Open Finance future-ready' }
                  }
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td>
                      {row.trad.type === 'check' && <Icon icon="mdi:check-circle" className={styles.icon_check} />}
                      {row.trad.type === 'cross' && <Icon icon="mdi:close-circle" className={styles.icon_cross} />}
                      {row.trad.text}
                    </td>
                    <td className={styles.highlight_col}>
                      {row.pay10.type === 'check' && <Icon icon="mdi:check-circle" className={styles.icon_check} />}
                      {row.pay10.type === 'cross' && <Icon icon="mdi:close-circle" className={styles.icon_cross} />}
                      {row.pay10.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={<span className={styles.gradient_heading}>Ensuring minimal disruption to your existing salary processing</span>}
        subheading="Our end-to-end WPS solution is built to make switching effortless."
        points={[
          "Smooth migration for existing payroll cards: no disruption to employees",
          "Seamless salary disbursement from day one",
          "Full regulatory compliance with the new CBUAE WPS framework",
          "Reduced administrative effort for HR and payroll teams",
          "Digital access for all employees via Pay10 UAE App",
          "Transparent fee structure and simplified onboarding process"
        ]}
        imageSrc="/images/prod_imports/wps-02-bubble.png"
        imageAlt="Minimal Disruption"
        isReversed={true}
        isGreyBg={true}
      />

      <section className={styles.biz_final_cta}>
        <h2 className={styles.cta_heading}>Ready to pay your employees the smarter way?</h2>
        <p className={styles.cta_sub}>Contact our sales team we'll handle registration, account setup, and your first salary run.</p>
        <div className={styles.cta_buttons}>
          <Link href="/contact-us?type=Enterprise+Sales" className={styles.cta_btn_primary}>Enterprise Sales</Link>
        </div>
      </section>

      <section className={styles.biz_app_download}>
        <h2 className={styles.app_download_heading}>Merchant App</h2>
        <div className={styles.app_download_badges}>
          <a href="#" className={styles.app_badge} aria-label="Download on the App Store">
            <Icon icon="ic:baseline-apple" width={28} />
            <div>
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="#" className={styles.app_badge} aria-label="Get it on Google Play">
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

export default WpsPayrollPage;
