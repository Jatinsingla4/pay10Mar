'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../../contexts/ResponsiveContext'
import '@/styles/components/_footer.scss'

const footerData = {
  logo: {
    src: '/images/common/logo.png',
    alt: 'Pay10',
    href: '/',
  },
  // ponytail: flat columns — nesting was what made the footer tall
  columns: [
    {
      key: 'company',
      label: 'Company',
      items: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Vision & Mission', href: '/vision-mission' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
    },
    {
      key: 'consumer',
      label: 'Consumer Solutions',
      items: [
        { label: 'Pay10 UAE', href: '/pay10-uae-app' },
        { label: 'Bill Payment', href: '/bill-payment' },
        { label: 'Send Abroad', href: '/send-abroad' },
        { label: 'Pay10 Card', href: '/pay10-card' },
        { label: 'Open Finance Al Tareq', href: '/open-finance-altareq' },
      ],
    },
    {
      key: 'business',
      label: 'Business Solutions',
      items: [
        { label: 'Pay10 Biz UAE', href: '/pay10-biz-uae-app' },
        { label: 'Merchant Portal', href: '/merchant-portal' },
        { label: 'Payment Gateways', href: '/payment-gateway' },
        { label: 'POS Devices', href: '/pos-devices' },
        { label: 'WPS & Payroll', href: '/wps-payroll' },
        { label: 'Channel Partners', href: '/channel-partners' },
      ],
    },
    {
      key: 'legal',
      label: 'Legal',
      items: [
        { label: 'Terms of Services', href: '/terms-of-service' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Cookie Policy', href: '/cookie-policy' },
        { label: 'Key Facts Statement', href: '/key-fact-statement' },
        { label: 'Schedule of Charges', href: '/coming-soon' },
      ],
    },
    {
      key: 'faq',
      label: 'FAQ',
      href: '/faqs',
      items: [
        { label: 'Pay10 UAE', href: '/faqs?category=Pay10+UAE' },
        { label: 'Pay10 Biz UAE', href: '/faqs?category=Pay10+Biz+UAE' },
        { label: 'Bill Payment', href: '/faqs?category=Bill+Payment' },
        { label: 'Card Issuing', href: '/faqs?category=Card+Issuing' },
        { label: 'Send Abroad', href: '/faqs?category=Send+Abroad' },
        { label: 'WPS Employee', href: '/faqs?category=WPS+Employee' },
        { label: 'Fraud', href: '/faqs?category=Fraud' },
        { label: 'Al Tareq FAQ', href: '/faq-altareq' },
      ],
    },
    {
      key: 'resources',
      label: 'Resources',
      items: [
        {
          label: 'Brand Guidelines',
          href: 'https://pay10.ae/wp-content/uploads/2026/05/Pay10-Ext-Brandguidelines-21-May-2026.pdf',
          external: true,
        },
        {
          label: 'App & Web Button Guidelines',
          href: 'https://pay10.ae/wp-content/uploads/2026/06/Product-Approved_2June2026_Pay10-UAE_Button-Designs-April-20-RGB_Including-QR_07.pdf',
          external: true,
        },
        {
          label: 'DQR Device User Manual',
          href: '/docs/dqr-device-user-manual.pdf',
          external: true,
        },
      ],
    },
  ],
  socialMedia: {
    linkedin: 'https://ae.linkedin.com/company/pay10-uae',
    x: 'https://x.com/pay10UAE',
    instagram: 'https://www.instagram.com/pay10.uae/',
    facebook: 'https://www.facebook.com/people/Pay10-UAE/61570783563019/#',
    youtube: 'https://www.youtube.com/@Pay10UAE',
  },
}

const socialIcons = [
  { key: 'linkedin', icon: 'mdi:linkedin', label: 'LinkedIn' },
  { key: 'x', icon: 'bi:twitter-x', label: 'X' },
  { key: 'instagram', icon: 'mdi:instagram', label: 'Instagram' },
  { key: 'facebook', icon: 'mdi:facebook', label: 'Facebook' },
  { key: 'youtube', icon: 'mdi:youtube', label: 'YouTube' },
]

const SubLink = ({ item }) =>
  item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer__nav-sublink">
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className="footer__nav-sublink">
      {item.label}
    </Link>
  )

const SocialLinks = () => (
  <div className="footer__social">
    {socialIcons.map(({ key, icon, label }) => (
      <a
        key={key}
        href={footerData.socialMedia[key]}
        target="_blank"
        rel="noopener noreferrer"
        className="footer__social-link"
        aria-label={label}
      >
        <Icon icon={icon} className="footer__social-icon" />
      </a>
    ))}
  </div>
)

const Footer = () => {
  const [openSections, setOpenSections] = useState({})
  const { isMobile, isTablet } = useResponsive()
  const isCollapsed = isMobile || isTablet

  const toggleSection = useCallback((key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const renderNavLinks = () =>
    footerData.columns.map((col) => (
      <div key={col.key} className="footer__nav-item">
        {isCollapsed ? (
          <>
            <button
              className="footer__nav-link footer__nav-link--accordion"
              onClick={() => toggleSection(col.key)}
              aria-expanded={!!openSections[col.key]}
            >
              <span>{col.label}</span>
              <Icon
                icon={openSections[col.key] ? 'mdi:chevron-up' : 'mdi:chevron-right'}
                className="footer__nav-chevron"
              />
            </button>
            {openSections[col.key] && (
              <div className="footer__nav-subitems">
                {col.items.map((item) => (
                  <SubLink key={item.label} item={item} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {col.href ? (
              <Link href={col.href} className="footer__nav-heading">
                {col.label}
              </Link>
            ) : (
              <div className="footer__nav-heading">{col.label}</div>
            )}
            <div className="footer__nav-subitems">
              {col.items.map((item) => (
                <SubLink key={item.label} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    ))

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo */}
        <div className="footer__logo">
          <Link href={footerData.logo.href}>
            <Image className="footer__logo-img" width={98} height={61} src={footerData.logo.src} alt={footerData.logo.alt} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="footer__nav footer__nav--desktop" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Mobile Navigation */}
        <nav className="footer__nav footer__nav--mobile" aria-label="Footer navigation">
          {renderNavLinks()}
        </nav>

        {/* Social Media - Desktop */}
        <div className="footer__actions footer__actions--desktop">
          <SocialLinks />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <div className="footer__address footer__address--en">
            <span>Copyright © 2026</span>
            <span>Pay Ten Payment Services Provider LLC is licensed by the Central Bank of the UAE, U-Bora Office Tower, Office 1004,</span>
            <span>Business Bay, Dubai, United Arab Emirates</span>
          </div>
        </div>
      </div>

      {/* Social Media - Mobile */}
      <div className="footer__actions footer__actions--mobile">
        <SocialLinks />
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'

export default Footer
