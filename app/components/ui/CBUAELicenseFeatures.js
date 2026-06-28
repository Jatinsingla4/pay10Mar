import React from "react";
import Style from "./CBUAELicenseFeatures.module.scss";

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WalletIcon = () => <img src="/images/home/cbuae-icon-1.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;
const POSIcon    = () => <img src="/images/home/cbuae-icon-2.png" alt="" width="28" height="24" style={{imageRendering:'crisp-edges'}} />;
const BankIcon   = () => <img src="/images/home/cbuae-icon-3.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;
const GlobeIcon  = () => <img src="/images/home/cbuae-icon-4.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '4px' }}>
    <defs>
      <linearGradient id="check-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="var(--red)"/>
        <stop offset="40%" stopColor="var(--orange)"/>
        <stop offset="100%" stopColor="var(--yellow)"/>
      </linearGradient>
    </defs>
    <path d="M5 12L10 17L20 7" stroke="url(#check-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CBUAELicenseFeatures = () => {
  const cards = [
    {
      id: "01",
      icon: <WalletIcon />,
      title: "Stored Value Facility",
      description: "The license that lets us hold and manage your money - legally, safely, under CBUAE supervision.",
      hoverData: {
        title: "Your money, secured and accessible anytime.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Digital wallet issuance",
          "Store of value management",
          "Peer-to-peer money transfers",
          "User fund safeguarding",
          "Cash-in and cash-out operations"
        ]
      }
    },
    {
      id: "02",
      icon: <POSIcon />,
      title: "Retail Payment Services - RPS-II",
      description: "The license that puts us directly inside the UAE payment ecosystem - for merchants, QR, gateways, and more.",
      hoverData: {
        title: "We don't rely on another bank to process your payments. We do it directly.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Merchant payment acceptance",
          "QR code payment processing",
          "Payment gateway operations",
          "Merchant acquiring services",
          "End-to-end settlement"
        ]
      }
    },
    {
      id: "03",
      icon: <BankIcon />,
      title: "Open Finance",
      description: "One of the UAE's newest regulatory frameworks - enabling us to connect your finances across banks and institutions.",
      hoverData: {
        title: "The future of finance is connected. Pay10 is already licensed for it.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Secure financial data sharing (with consent)",
          "Bank & institution integrations",
          "Account aggregation across providers",
          "Smart budgeting & lending insights",
          "Embedded finance innovation"
        ]
      }
    },
    {
      id: "04",
      icon: <GlobeIcon />,
      title: "Cross-Border Remittance",
      description: "The license that lets you send money internationally from the UAE - legally, instantly, at scale.",
      hoverData: {
        title: "Sending money home shouldn't require paperwork, waiting, or worrying.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Send money from UAE internationally",
          "Receive inbound remittances",
          "Global money transfer network access",
          "Multi-corridor cross-border transfers",
          "Forex conversion at competitive rates"
        ]
      }
    }
  ];

  return (
    <section className={Style.feature_grid_section}>
      <div className={Style.container}>
        
        {/* Left Content */}
        <div className={Style.left_content}>
          <span className={Style.eyebrow} data-animation="opacity-up">CBUAE Licensed &middot; Our Credibility</span>
          <h2 data-animation="opacity-up" data-anim-delay="100">Built on the strongest regulatory foundation in the UAE.</h2>
          <p data-animation="opacity-up" data-anim-delay="200">
            Pay10 holds four Central Bank of the UAE licenses - SVF, RPS-II, Open Finance, and Remittance. Together they make Pay10 a fully regulated fintech solution provider to both merchants and consumers catering to all financial alternative payment methods.
          </p>
          <div className={Style.highlight_text} data-animation="opacity-up" data-anim-delay="300">
            Most fintechs hold 1, maybe 2. Pay10 holds all 4.
          </div>
          
          <div className={Style.logo_wrapper} data-animation="opacity-up" data-anim-delay="400">
            <img src="/images/home/cbuae-logo.png" alt="Central Bank of the UAE" className={Style.cbuae_logo} />
          </div>
        </div>

        {/* Right Grid */}
        <div className={Style.right_grid}>
          {cards.map((card, index) => (
            <div key={card.id} className={Style.feature_card} data-animation="opacity-up" data-anim-delay={`${100 * (index + 1)}`}>
              <div className={Style.card_content}>
                <div className={Style.card_header}>
                  <div className={Style.icon}>{card.icon}</div>
                  <span className={Style.number}>{card.id}</span>
                </div>
                <h3 className={Style.card_title}>{card.title}</h3>
                <p className={Style.card_desc}>{card.description}</p>
                <div className={Style.arrow_wrapper}>
                  <ArrowIcon />
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className={Style.card_hover_overlay}>
                <h4 className={Style.hover_title}>{card.hoverData.title}</h4>
                <div className={Style.hover_subtitle}>{card.hoverData.subtitle}</div>
                <ul className={Style.hover_features}>
                  {card.hoverData.features.map((feature, i) => (
                    <li key={i}>
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CBUAELicenseFeatures;
