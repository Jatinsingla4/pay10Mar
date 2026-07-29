import React from "react";
import Style from "./CBUAELicenseFeatures.module.scss";

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CBUAELicenseFeatures = ({
  eyebrow = "CBUAE Licensed · Our Credibility",
  title = "Built on the strongest regulatory foundation in the UAE.",
  content = "",
  cardsData = [],
  logo
}) => {
  const parseContent = (htmlString) => {
    if (!htmlString) return { __html: "" };
    // Replace [gradient]...[/gradient] with a span containing the global gradient-text class
    const parsed = htmlString.replace(/\[gradient\](.*?)\[\/gradient\]/g, '<span class="gradient-text">$1</span>');
    return { __html: parsed };
  };

  return (
    <section className={Style.feature_grid_section}>
      <div className={Style.container}>
        
        {/* Left Content */}
        <div className={Style.left_content}>
          {eyebrow && <span className={Style.eyebrow} data-animation="opacity-up">{eyebrow}</span>}
          {title && <h2 data-animation="opacity-up" data-anim-delay="100">{title}</h2>}
          
          {content && (
            <div className={Style.cms_content} data-animation="opacity-up" data-anim-delay="200" dangerouslySetInnerHTML={parseContent(content)} />
          )}
          
          {logo && (
            <div className={Style.logo_wrapper} data-animation="opacity-up" data-anim-delay="400">
              <img src={logo} alt="Central Bank of the UAE" className={Style.cbuae_logo} />
            </div>
          )}
        </div>

        {/* Right Grid */}
        <div className={Style.right_grid}>
          {cardsData && cardsData.map((card, index) => (
            <div key={index} className={Style.feature_card} data-animation="opacity-up" data-anim-delay={`${100 * (index + 1)}`}>
              <div className={Style.card_content}>
                <div className={Style.card_header}>
                  <div className={Style.icon}>
                    {card.icon && <img src={card.icon} alt="" width="24" height="24" style={{imageRendering:'crisp-edges', objectFit:'contain'}} />}
                  </div>
                  <span className={Style.number}>{(index + 1).toString().padStart(2, '0')}</span>
                </div>
                <h3 className={Style.card_title}>{card.title}</h3>
                {card.subtitle && <p className={Style.card_desc}>{card.subtitle}</p>}
                <div className={Style.arrow_wrapper}>
                  <ArrowIcon />
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className={Style.card_hover_overlay}>
                {card.content && (
                  <div className={Style.hover_cms_content} dangerouslySetInnerHTML={{ __html: card.content }} />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CBUAELicenseFeatures;
