"use client";
import React from 'react';
import Link from 'next/link';
import Style from './GlobalContactCTA.module.scss';
import { sanitizeHtml } from '../../lib/sanitizeHtml';

const GlobalContactCTA = ({ 
  title = "For Any Inquiries",
  subtitle = "Please feel free to contact us",
  buttonText = "Contact Us",
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
