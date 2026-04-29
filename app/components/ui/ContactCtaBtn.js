import Link from "next/link";
import React from "react";
import Style from './ContactCtaBtn.module.scss'

const ContactCtaBtn = ({ variant = 'black', text = 'Contact Us' }) => {
  const className = variant === 'orange' 
    ? `${Style.header_contact_btn} ${Style.header_contact_btn__orange}`
    : Style.header_contact_btn;
  
  return (
    <Link href="/contact-us" className={className}>
      {text}
    </Link>
  );
};

export default ContactCtaBtn;
