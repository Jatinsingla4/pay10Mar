"use client";
import React from 'react';
import Link from 'next/link';
import Style from './GlobalContactCTA.module.scss';
import { sanitizeHtml } from '../../lib/sanitizeHtml';

const GlobalContactCTA = ({ 
  title = "Pour toute demande",
  subtitle = "Pour toute question ou demande d'information, n'hésitez pas à nous contacter.",
  buttonText = "Contactez-nous",
  buttonHref = "/contact-us" 
}) => {
  return (
    <div className={Style.cta_section} data-animation="opacity-up">
      <h3 className={Style.cta_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></h3>
      {subtitle && <p className={Style.cta_sub}>{subtitle}</p>}
      <Link href={buttonHref} className={Style.cta_btn}>{buttonText}</Link>
    </div>
  );
};

export default GlobalContactCTA;
