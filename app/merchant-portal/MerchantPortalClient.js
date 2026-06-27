"use client";

import { Icon } from '@iconify/react';
import Link from 'next/link';
import Style from "./page.module.scss";

const MerchantPortalClient = () => {
  return (
    <main>
      <section className={Style.altareq_hero}>
        <div className={Style.altareq_hero_text}>
          <h2>
            Your business data.<br />One portal. Full control.
          </h2>
          <p>
            A dedicated merchant portal with your own secure credentials giving you complete visibility of transactions, settlements, VAT reports, and live API integration with your ERP system.
          </p>
        </div>
      </section>
      
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>Connect Pay10 to how your business already runs.</h2>
          <p>The Pay10 Merchant Portal integrates directly with your ERP system via API so your payment data, settlement records, and transaction history flow automatically into the tools your finance team already uses. No manual exports. No reconciliation headaches.</p>
        </div>
        <div className={Style.benefits_grid}>
          {[
            {
              num: '01',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
              title: 'REST API integration',
              desc: 'Clean, documented REST API endpoints connecting your Pay10 portal to your ERP, accounting, or finance platform in real time.',
            },
            {
              num: '02',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
              title: 'Automated reconciliation',
              desc: 'Transaction data, settlement records, and VAT figures flow automatically eliminating manual data entry and reconciliation errors.',
            },
            {
              num: '03',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l7 4v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
              title: 'Webhooks & real-time events',
              desc: 'Real-time event notifications payment received, refund processed, settlement confirmed pushed directly to your system the moment they happen.',
            },
            {
              num: '04',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
              title: 'Custom integrations for enterprise',
              desc: 'Pay10\'s team has the expertise and capability to build custom integrations tailored to your enterprise ERP SAP, Oracle, Microsoft Dynamics, and more.',
            },
          ].map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={Style.benefit_desc}>{item.desc}</p>
              <span className={Style.benefit_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>


      <section className={Style.api_integration}>
        <div className={Style.api_content}>
          <div className={Style.api_left}>
            <h2>Your settlements. In your ERP. The moment they happen</h2>
            <p>Pay10's REST API connects your merchant portal directly to your ERP so settlement data, transaction records, and VAT figures sync automatically, without anyone lifting a finger. No spreadsheets. No manual entry. No end-of-day reconciliation panic.</p>
          </div>
          <div className={Style.api_right}>
            <div className={Style.code_window}>
              <div className={Style.code_header}>
                <span className={Style.dot_red}></span>
                <span className={Style.dot_yellow}></span>
                <span className={Style.dot_green}></span>
                <span className={Style.tab_active}>settlements.js</span>
                <span className={Style.tab_inactive}>transactions.js</span>
                <span className={Style.tab_inactive}>webhook.js</span>
              </div>
              <pre className={Style.code_body}>
                <code>
<span className={Style.code_comment}>// Pull today's settlements directly into your ERP</span>
<br />
<span className={Style.code_keyword}>const</span> <span className={Style.code_variable}>settlements</span> = <span className={Style.code_keyword}>await</span> <span className={Style.code_object}>pay10.portal</span>.<span className={Style.code_method}>getSettlements</span>({'{'}
<br />
{'  '}merchantId: <span className={Style.code_string}>"mid_8fj2kd9x"</span>,
<br />
{'  '}date: <span className={Style.code_string}>"today"</span>,
<br />
{'  '}currency: <span className={Style.code_string}>"AED"</span>,
<br />
{'  '}format: <span className={Style.code_string}>"erp_ready"</span>
<br />
{'});'}
<br />
<br />
<span className={Style.code_comment}>// Response → settlement posted to your ERP instantly</span>
<br />
<span className={Style.code_object}>console</span>.<span className={Style.code_method}>log</span>(settlements.status); <span className={Style.code_comment}>// "synced"</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className={Style.enterprise_section}>
        <div className={Style.enterprise_header}>
          <h2>Complex operations deserve a payment partner who gets it.</h2>
          <p>For enterprise merchants, Pay10 goes beyond the standard portal. Our team has the expertise and capability to design, build, and deliver custom integrations tailored to your ERP infrastructure, your operational hierarchy, and your reporting requirements.</p>
        </div>
        
        <div className={Style.enterprise_cards_wrapper}>
          <div className={Style.enterprise_cards}>
            {[
              {
                num: '01',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
                title: 'Custom ERP integration',
                desc: 'SAP, Oracle, Microsoft Dynamics, custom-built systems  Pay10\'s team builds the integration around your stack, not the other way around.',
              },
              {
                num: '02',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
                title: 'Multi-location hierarchy',
                desc: 'Set up merchant hierarchies  head office, regional manager, branch  with role-based access and consolidated reporting at every level.',
              },
              {
                num: '03',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                title: 'User & cashier management',
                desc: 'Create, manage, and monitor users and cashiers across locations. Set permissions, view individual performance, and maintain full operational control.',
              },
              {
                num: '04',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                title: 'VAT & compliance reporting',
                desc: 'Automated VAT reports aligned with UAE FTA requirements  export-ready for your finance team or directly into your accounting system.',
              },
              {
                num: '05',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                title: 'Advanced analytics',
                desc: 'Transaction trends, peak hours, payment method mix, location performance  data that helps you make better decisions, not just count transactions.',
              },
              {
                num: '06',
                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                title: 'Dedicated onboarding team',
                desc: 'A dedicated Pay10 enterprise team manages your onboarding end-to-end  from integration scoping to go-live. You have a named contact, always.',
              },
            ].map((item) => (
              <div key={item.num} className={Style.enterprise_card}>
                <span className={Style.card_num}>{item.num}</span>
                <div className={Style.card_icon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>Everything you need to manage your payments in one login.</h2>
          <p>Your Pay10 Merchant Portal credentials are set up by our team and handed directly to you. Login once and your entire payments operation is visible, manageable, and in your control.</p>
        </div>
        <div className={Style.benefits_grid}>
          {[
            {
              num: '01',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
              title: 'Transaction history',
              sub: 'Every payment. Every detail. Searchable.',
              desc: 'Full transaction history with filter, search, and export  by date, amount, method, cashier, or location.',
              bullets: [
                'Filter by date range, payment method, status',
                'Export as PDF or CSV for reconciliation',
                'Drill into individual transaction details'
              ]
            },
            {
              num: '02',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              title: 'Settlements',
              sub: 'Same-day. Always visible. Never a surprise.',
              desc: 'Real-time settlement status  see what\'s settled, what\'s pending, and when your next payout hits your account.',
              bullets: [
                'T+0 same-day settlement tracking',
                'Settled vs unsettled balance at a glance',
                'Settlement history with downloadable record'
              ]
            },
            {
              num: '03',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
              title: 'VAT reporting',
              sub: 'UAE FTA-aligned. Export-ready. Always.',
              desc: 'Automated VAT summaries and detailed transaction reports aligned with UAE Federal Tax Authority requirements.',
              bullets: [
                'VAT-inclusive transaction breakdown',
                'Export for FTA filing in one click',
                'Monthly and quarterly report formats'
              ]
            },
            {
              num: '04',
              icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>,
              title: 'Refunds & disputes',
              sub: 'Handle refunds without calling anyone.',
              desc: 'Process refunds, track dispute status, and manage chargebacks  all directly from the portal without needing support.',
              bullets: [
                'Initiate refunds in seconds',
                'Full refund history and status tracking',
                'Dispute management with audit trail'
              ]
            }
          ].map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              {item.sub && <p className={Style.benefit_sub}>{item.sub}</p>}
              <p className={Style.benefit_desc}>{item.desc}</p>
              {item.bullets && (
                <ul className={Style.benefit_bullets}>
                  {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              <span className={Style.benefit_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>
      <section className={Style.reasons_section}>
        <div className={Style.reasons_header}>
          <h2>Why Pay10 merchants never look back.</h2>
          <p>Five benefits that no other business solutions App, POS DQR Device, and Portal Dashboard platform in the UAE offers together for every merchant, at every scale.</p>
        </div>
        <div className={Style.reasons_list}>
          {[
            {
              num: '01',
              title: 'Lowest MDR',
              desc: 'The lowest transaction fees on the UAE market. Keep more of every sale.',
              img: '/images/home/hero-mobile-2.png'
            },
            {
              num: '02',
              title: 'Same-day settlement',
              desc: 'T+0. Your working capital available the day you earn it.',
              img: '/images/home/hero-mobile-2.png'
            },
            {
              num: '03',
              title: 'No hidden fees',
              desc: 'Complete visibility. What you see is exactly what you pay.',
              img: '/images/home/hero-mobile-2.png'
            },
            {
              num: '04',
              title: 'CBUAE Licensed',
              desc: 'Four Central Bank of UAE licences. A fully regulated financial partner.',
              img: '/images/home/hero-mobile-2.png'
            },
            {
              num: '05',
              title: '24/7 Human support',
              desc: 'Call. A human picks up. Multi-language. Zero wait. Every time.',
              img: '/images/home/hero-mobile-2.png'
            }
          ].map((item, index) => (
            <div key={index} className={Style.reason_row}>
              <div className={Style.reason_left}>
                <span className={Style.reason_num}>{item.num}</span>
                <span className={Style.reason_title}>{item.title}</span>
              </div>
              <div className={Style.reason_mid}>
                <p>{item.desc}</p>
              </div>
              <img src={item.img} alt={item.title} className={Style.hover_image} />
            </div>
          ))}
        </div>
      </section>
      <section className={Style.final_cta_section}>
        <div className={Style.final_cta_content}>
          <h2>Pay10 has the in-house expertise and capability to build custom integrations for enterprise clients tailored to your ERP, your data architecture, and your operational structure. If your business has complex requirements, our enterprise team is ready to scope it with you.</h2>
          <div className={Style.final_cta_buttons}>
            <Link href="/contact-us?type=Enterprise+Sales" className={Style.cta_btn}>Enterprise Sales</Link>
          </div>
        </div>
        <div className={Style.final_cta_banner}>
          <div className={Style.biz_app_download}>
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default MerchantPortalClient;
