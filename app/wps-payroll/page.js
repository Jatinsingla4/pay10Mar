import React from "react";
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
              Pay all your employees' salaries digitally — compliant, scalable, and fully powered by Pay10. A CBUAE-licensed WPS provider built for every type of UAE employer and every type of UAE employee.
            </p>
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
        heading={<span className={styles.gradient_heading}>What is the Wage Protection System (WPS)?</span>}
        subheading={<span className={styles.grey_text}>The Wage Protection System (WPS) is a UAE government mandate managed by the Central Bank of the UAE (CBUAE). It requires every employer in the UAE — across all industries, for all workers, blue collar and white collar — to process salaries digitally through a CBUAE-licensed provider. The system verifies that every employee is paid what their labour contract says, and that they are paid on time. Non-compliance carries significant penalties. Pay10 is a fully licensed WPS provider — meaning every salary processed through Pay10 satisfies this mandate completely.</span>}
        imageSrc="/images/prod_imports/consumer-app-phone.png"
        imageAlt="Wage Protection System"
        isReversed={false}
        isGreyBg={false}
      />

      <section className={styles.who_is_for_section}>
        <div className={styles.who_container}>
          <h2 className={styles.section_title}>Who is This For?</h2>
          
          <div className={styles.who_grid}>
            {/* Employers Column */}
            <div className={styles.who_col}>
              <h3>For employers</h3>
              <p>
                One WPS solution for all your payroll needs. From SMEs with 10 staff to enterprises with thousands — Pay10 handles it all, compliantly.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Fully CBUAE-licensed WPS salary disbursement</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Upload SIF file — Pay10 processes instantly</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> IBAN transfers for banked employees</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Universal Account setup for unbanked workers</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Analytics dashboard — full payroll visibility</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Reduced admin effort and paperwork</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Transparent fee structure — no surprises</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Smooth migration from existing payroll cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Full regulatory compliance with new CBUAE WPS framework</li>
              </ul>
            </div>

            {/* Employees Column */}
            <div className={styles.who_col}>
              <h3>For employees</h3>
              <p>
                A universal account and everything they need to use it. Banked or unbanked — every employee gets full access to their salary digitally.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Universal Account — works for banked and unbanked workers</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Jaywan card — ATM withdrawals, POS purchases, digital transactions</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay10 UAE App — full digital access to salary and account</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Scan and pay at merchants across all 7 Emirates</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Send money internationally to family back home</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay bills — utilities, telecom, transport, gift cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Card management in-app — limits, freeze, cancel</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> IBAN transfers — send to any UAE bank account</li>
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
              desc: 'CBUAE-licensed WPS provider enabling secure, compliant, and fully digital salary processing — aligned with the new WPS framework.',
            },
            {
              num: '02',
              icon: <Icon icon="mdi:bank-transfer" width={28} />,
              title: 'Secure salary transfers',
              desc: 'IBAN-based transfers for banked employees. Universal Account for unbanked and blue-collar workers — safe, instant, every salary run.',
            },
            {
              num: '03',
              icon: <Icon icon="mdi:credit-card" width={28} />,
              title: 'Jaywan card services',
              desc: 'Jaywan card issued to every unbanked employee — linked to their Universal Account for ATM withdrawals, POS purchases, and digital payments.',
            },
            {
              num: '04',
              icon: <Icon icon="mdi:cellphone-check" width={28} />,
              title: 'Pay10 UAE App',
              desc: 'Full digital access for blue-collar employees to their Universal Account — view balance, pay bills, scan and pay, send money, manage their card.',
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
                Salary straight to their existing bank account. White-collar, salaried, already banked — Pay10 handles WPS compliance without changing how they receive their salary.
              </p>
              <ul className={styles.feature_list}>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Salary transferred directly to their existing UAE IBAN</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> No new account needed — seamless for the employee</li>
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
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Jaywan debit card — ATM, POS, online transactions</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay10 UAE App — balance, transfers, scan and pay</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Send money home — international transfers in app</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> Pay bills — utilities, telecom, transport, gift cards</li>
                <li><Icon icon="mdi:check" className={styles.list_icon} /> No more anonymous salary cards with no name attached</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WpsPayrollPage;
