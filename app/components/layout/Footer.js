'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useResponsive } from '../../contexts/ResponsiveContext'
import faqData from '../../faqs/faqData'
import '@/styles/components/_footer.scss'

// FAQ column items carry `?category=X` — X matches a faqData tabName 1:1.
// If the CMS 'faqs' page has a section title at that same index, it wins.
function applyFaqCmsLabels(items, faqPageData) {
  if (!faqPageData?.sections?.length) return items
  return items.map((item) => {
    const category = item.href.split('category=')[1]
    if (!category) return item
    const tabName = decodeURIComponent(category.replace(/\+/g, ' '))
    const idx = faqData.findIndex((t) => t.tabName === tabName)
    const cmsTitle = faqPageData.sections[idx]?.title?.replace(/<[^>]+>/g, '').trim()
    return cmsTitle ? { ...item, label: cmsTitle } : item
  })
}

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
      label: 'Entreprise',
      items: [
        { label: 'À propos de nous', href: '/about-us' },
        { label: 'Vision et Mission', href: '/vision-mission' },
        { label: 'Carrières', href: '/careers' },
        { label: 'Contact', href: '/contact-us' },
      ],
    },
    {
      key: 'consumer',
      label: 'Solutions Particuliers',
      items: [
        { label: 'Pay10 Maroc', href: '/pay10-uae-app' },
        { label: 'Paiement de factures', href: '/bill-payment' },
        { label: "Transfert d'argent", href: '/send-abroad' },
        { label: 'Alimentation du Wallet', href: '/pay10-card' },
        { label: 'Virement bancaire', href: '/open-finance-altareq' },
      ],
    },
    {
      key: 'business',
      label: 'Solutions Professionnels',
      items: [
        { label: 'Pay10 Biz Maroc', href: '/pay10-biz-uae-app' },
        // ponytail: Merchant Portal hidden from nav per client request, page left intact
        { label: 'Payment Gateways', href: '/payment-gateway' },
        { label: 'Terminal POS', href: '/pos-devices' },
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
        { label: 'Schedule of Charges', href: '/schedule-of-charges' },
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
    linkedin: 'https://www.linkedin.com/company/pay10-maroc/',
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

const Footer = ({ faqPageData = null }) => {
  const [openSections, setOpenSections] = useState({})
  const { isMobile, isTablet } = useResponsive()
  const isCollapsed = isMobile || isTablet

  const toggleSection = useCallback((key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const columns = footerData.columns.map((col) =>
    col.key === 'faq' ? { ...col, items: applyFaqCmsLabels(col.items, faqPageData) } : col
  )

  const renderNavLinks = () =>
    columns.map((col) => (
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
            <span>Pay10 Maroc est un Établissement de Paiement agréé et réglementé par Bank Al-Maghrib, Casa Business Towers, Avenue Mainstreet, 1er Étage, Bureau N°31/32,</span>
            <span>Casablanca Finance City, Casablanca, Maroc</span>
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
