"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { Icon } from "@iconify/react";
import styles from "./pos.module.scss";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";
import { useResponsive } from "@/app/contexts/ResponsiveContext";

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const MERCHANT_APPLE_URL = "https://apps.apple.com/ae/app/pay10-biz-uae/id6741104134";
const MERCHANT_PLAY_URL = "https://play.google.com/store/apps/details?id=ae.pay10.merchant.app";

// Picks the first non-CKEditor-empty value among `description`/`content`,
// falling back to `def` only when both are genuinely empty.
const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const PosDevicesClient = ({ pageData = null, testimonialVideos = [], testimonialTitle, testimonialContent, merchantLogos = [] }) => {
  const { isMobile } = useResponsive();
  const merchantQr = pageData?.sections?.[6]?.images?.[0] || "/images/prod_imports/biz-app-store-qr.png";

  const [merchantStoreUrl, setMerchantStoreUrl] = useState(MERCHANT_PLAY_URL);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (isIOS) setMerchantStoreUrl(MERCHANT_APPLE_URL);
  }, []);

  // Consumer Feature Points
  const rawSubHeading = pageData?.sections?.[0]?.description || pageData?.sections?.[0]?.content || "";
  const parts = rawSubHeading.split('---');
  const subHeadingText = parts[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "Chaque appareil Pay10 génère un code QR Dynamique unique par transaction — créé instantanément, lié au montant exact, confirmé en temps réel. Pas un autocollant statique. Pas un code partagé. Un QR sécurisé et en direct, généré à chaque paiement.";
  
  const tagsText = parts[1] || pageData?.sections?.[0]?.cards?.[0]?.tags;
  const consumerFeaturePoints = tagsText
    ? tagsText.split(',').map(t => t.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean)
    : [
        "QR Dynamique généré à chaque transaction - unique, lié au montant, instantané",
        "Le client scanne avec Pay10 Maroc, paiement confirmé en moins de 2 secondes",
        "Confirmation audio et visuelle sur l'appareil, sans ambiguïté ni erreur",
        "QR statique également pris en charge pour les commerçants qui ont besoin des deux options",
        "Confirmation sonore avec alerte de paiement audible dans tout environnement",
        "La première gamme d'appareils au Maroc à généraliser le QR Dynamique pour les paiements en magasin"
      ];

  // Compare Section
  const defaultDevices = [
    {
      name: 'P5',
      tagline: 'Un design élégant, une technologie de paiement avancée.',
      bestFor: 'Comptoirs de vente, restaurants, salons et boutiques lifestyle où le design compte autant que la fonction. Le terminal de comptoir phare de Pay10 — construit sur RTOS pour une stabilité à toute épreuve.',
      design: 'Proprietary Pay10 premium minimalist, gold accent',
      display: { customer: '3.98" full-colour + 1" merchant', merchant: '1" monochrome LCD' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'Supported', tap: 'DQR+Card variant only', dip: 'DQR+Card variant only' },
      variants: 'P5 DQR\nP5 DQR+Card',
      hardware: { os: 'RTOS — built for payment stability', keypad: 'Tilted keypad for fast, accessible input', battery: '2600 mAh Li-ion extended uptime', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: 'NA', gps: 'NA' },
      alerts: { audio: '✓ Loudspeaker sound box', visual: '✓ On-screen confirmation' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    },
    {
      name: 'POS10',
      tagline: 'Des paiements QR intelligents, simples et sécurisés pour chaque comptoir.',
      bestFor: 'Petites entreprises, comptoirs de restauration rapide et commerçants ayant besoin d\'un terminal de comptoir fiable et centré sur le QR — compact, abordable et conçu pour fonctionner toute la journée.',
      design: 'Compact countertop — small footprint, no gold accent',
      display: { customer: '3.98" full-colour customer', merchant: '1" monochrome LCD' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'Supported', tap: 'N/A', dip: 'NA' },
      variants: 'POS10 DQR',
      hardware: { os: 'RTOS — built for payment stability', keypad: 'Standard tactile keypad', battery: '2600 mAh — all-day performance', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: 'NA', gps: 'GPS / GNSS' },
      alerts: { audio: '✓ Loudspeaker sound box', visual: '✓ RGB LED strip + on-screen' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    },
    {
      name: 'P10',
      tagline: 'Mobilité robuste pour les paiements en déplacement. (Bientôt disponible)',
      bestFor: 'Flottes de livraison, opérateurs logistiques, transactions en déplacement et agents commerciaux terrain ayant besoin d\'un appareil de paiement Android robuste, fonctionnant partout où l\'activité se déroule.',
      design: 'Rugged handheld — durable mobile form factor',
      display: { customer: 'Full colour high-visibility screen', merchant: 'N/A — single screen device' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'NA', tap: 'DQR+Card variant only', dip: 'DQR+Card variant only' },
      variants: 'P10 DQR\nP10 DQR+Card',
      hardware: { os: 'Android — familiar, flexible, app-ready', keypad: 'Integrated — fast delivery payment entry', battery: 'High-capacity Li-ion — extended mobile use', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: '✓ Built-in Wi-Fi', gps: 'NA' },
      alerts: { audio: '✓ Built-in loudspeaker', visual: '✓ On-screen confirmation' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    }
  ];

  const devices = pageData?.sections?.[1]?.cards?.length > 0 
    ? pageData.sections[1].cards.map((c, i) => {
        // Fallback to default structure for deep nested fields if CMS doesn't provide them
        const def = defaultDevices[i] || defaultDevices[0];
        return {
          ...def,
          name: c.title || def.name,
          tagline: c.subtitle || def.tagline,
          // Device cards have no dedicated "images" field in the CMS — the
          // "icon" slot doubles as the product-photo upload here.
          image: c.icon || c.images?.[0],
          bestFor: c.description || c.content || def.bestFor
        };
      })
    : defaultDevices;

  // Guarantee Section
  const guarantees = pageData?.sections?.[2]?.cards?.map((c) => ({
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { title: '1 QR Dynamique sur chaque appareil', desc: "La première gamme d'appareils QR Dynamique au Maroc — QR unique à chaque transaction." },
    { title: '2 Mises à jour à distance', desc: 'Logiciel déployé à distance — aucune intervention technique, aucune interruption, toujours à jour.' },
    { title: '3 Configuration à distance', desc: 'Gérez tous vos appareils depuis le portail Pay10 Biz — où que vous soyez.' },
    { title: '4 Certifié PCI-DSS', desc: 'Chaque appareil est livré pré-certifié — la conformité est intégrée, pas ajoutée après coup.' },
    { title: '5 Confirmation audio', desc: 'Alerte sonore à chaque paiement — aucune ambiguïté, aucun échec silencieux.' },
    { title: '6 SIM préinstallée', desc: 'Prêt à l\'emploi — carte SIM 4G dédiée préinstallée, aucune configuration nécessaire.' },
    { title: '7 Livré et installé', desc: 'L\'équipe Pay10 livre et installe votre appareil sur place — vous n\'avez plus qu\'à commencer à encaisser.' },
    { title: '8 Lié à l\'app Pay10 Biz', desc: 'Chaque appareil se lie à Pay10 Biz Maroc — un seul geste pour enregistrer, gérer et suivre.' }
  ];

  // Flow Ecosystem
  const flowCards = pageData?.sections?.[3]?.cards?.map((c) => ({
    title: c.title,
    desc: c.subtitle,
    icon: c.icon
  })) || [
    { title: 'Appareil QR Dynamique', desc: 'POS10 • P5 • P10' },
    { title: 'App Pay10 Biz', desc: 'Gérer • Suivre • Lier' },
    { title: 'Portail Commerçant', desc: 'Transactions • TVA • Rapports' },
    { title: 'Règlement instantané', desc: 'T+0 • Le jour même • Toujours' },
    { title: 'Support 24/7', desc: 'Humain • Multilingue' }
  ];

  // Getting Started Steps
  const steps = pageData?.sections?.[4]?.cards?.map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { num: '1', title: 'Allumage', desc: 'Chargez complètement. Maintenez le bouton d\'alimentation 3 secondes. L\'appareil démarre et affiche le QR d\'enregistrement sur l\'écran client.' },
    { num: '2', title: 'Ouvrir Pay10 Biz Maroc', desc: 'Connectez-vous avec vos identifiants commerçant. Appuyez sur Gérer les appareils sur l\'écran d\'accueil.' },
    { num: '3', title: 'Enregistrer l\'appareil', desc: 'Sélectionnez votre appareil dans la liste. Appuyez sur Enregistrer. Scannez le QR affiché sur l\'appareil. Confirmez. Le statut passe à Actif.' },
    { num: '4', title: 'Vérifier et commencer à encaisser', desc: 'Effectuez une transaction test : montant en MAD, QR Dynamique généré, le client scanne, confirmation audio et visuelle. Vous êtes en ligne.' }
  ];

  return (
    <main className={styles.pos_page}>
      {/* Hero Banner Section */}
      <section className={styles.altareq_section}>
        <div
          className={styles.altareq_hero}
          style={bannerBgStyle(pageData)}
        >
          <div className={styles.altareq_hero_content}>
            {!isEmptyHtml(pageData?.page_title) && (
              <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
            )}
            {!isEmptyHtml(pageData?.page_subtitle) && (
              <p className={styles.altareq_hero_subtitle} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_subtitle) }} />
            )}
            {!isEmptyHtml(pageData?.page_description) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_description) }} />
            )}
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
          heading={
            <>
              {!isEmptyHtml(pageData?.sections?.[0]?.subtitle) && (
                <div className={styles.uae_label} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[0].subtitle) }} />
              )}
              {!isEmptyHtml(pageData?.sections?.[0]?.title) && (
                <span className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[0].title) }} />
              )}
            </>
          }
          subheading={subHeadingText}
          points={consumerFeaturePoints}
          imageSrc={pageData?.sections?.[0]?.images?.[0] || "/images/prod_imports/consumer-app-phone.png"}
          imageAlt="Technologie QR Dynamique"
          isReversed={false}
          isGreyBg={true}
        />

      <section className={styles.compare_section}>
        <div className={styles.container}>
          <div className={styles.compare_header}>
            {!isEmptyHtml(pageData?.sections?.[1]?.title) && (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[1].title) }} />
            )}
            {!isEmptyHtml(pageData?.sections?.[1]?.subtitle) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[1].subtitle) }} />
            )}
          </div>
          
          <div className={styles.compare_grid}>
            {devices.map((device, idx) => (
              <div key={idx} className={styles.device_card}>
                <div className={styles.card_header}>
                  <h3>{device.name}</h3>
                  <p className={styles.tagline}>{device.tagline}</p>
                  <div className={styles.device_image_wrap}>
                    <img src={device.image} alt={device.name} className={styles.device_image} />
                  </div>
                </div>

                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Idéal pour</span>
                    <span className={styles.val} dangerouslySetInnerHTML={{ __html: sanitizeHtml(device.bestFor) }} />
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Conception</span>
                    <span className={styles.val}>{device.design}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Variantes</span>
                    <span className={styles.val} style={{whiteSpace: 'pre-line'}}>{device.variants}</span>
                  </div>
                </div>

                <div className={styles.section_title}>AFFICHAGE</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Client</span>
                    <span className={styles.val}>{device.display.customer}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Commerçant</span>
                    <span className={styles.val}>{device.display.merchant}</span>
                  </div>
                </div>

                <div className={styles.section_title}>MOYENS DE PAIEMENT</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>QR Dynamique</span>
                    <span className={styles.val}>{device.payment.dqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>QR Statique</span>
                    <span className={styles.val}>{device.payment.sqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>TAP (Sans contact)</span>
                    <span className={styles.val}>{device.payment.tap}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>DIP (Puce)</span>
                    <span className={styles.val}>{device.payment.dip}</span>
                  </div>
                </div>

                <div className={styles.section_title}>MATÉRIEL & CONNECTIVITÉ</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>OS</span>
                    <span className={styles.val}>{device.hardware.os}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Clavier</span>
                    <span className={styles.val}>{device.hardware.keypad}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Batterie</span>
                    <span className={styles.val}>{device.hardware.battery}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Connectivité</span>
                    <span className={styles.val}>{device.connectivity.sim}<br/>{device.connectivity.wifi !== 'NA' ? device.connectivity.wifi : ''}</span>
                  </div>
                </div>

                <div className={styles.section_title}>ALERTES & GESTION</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Audio/Visuel</span>
                    <span className={styles.val}>{device.alerts.audio}<br/>{device.alerts.visual}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Conformité</span>
                    <span className={styles.val}>{device.management.pci}<br/>{device.management.app}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            {!isEmptyHtml(pageData?.sections?.[2]?.title) && (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[2].title) }} />
            )}
            {!isEmptyHtml(pageData?.sections?.[2]?.subtitle) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[2].subtitle) }} />
            )}
          </div>

          <div className={styles.guarantee_grid}>
            {guarantees.map((item, idx) => (
              <div key={idx} className={styles.guarantee_card}>
                <div className={styles.icon_wrap}>
                  {renderIcon(item.icon, styles.card_icon, 18)}
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ecosystem_flow_section}>
        <div className={styles.container}>
          <div className={styles.flow_header}>
            <div className={styles.flow_gradient_block}>
              {!isEmptyHtml(pageData?.sections?.[3]?.title) && (
                <span className={styles.flow_h2} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[3].title) }} />
              )}
              {!isEmptyHtml(pageData?.sections?.[3]?.subtitle) && (
                <span className={styles.flow_h3} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[3].subtitle) }} />
              )}
            </div>
            {!isEmptyHtml(pageData?.sections?.[3]?.description || pageData?.sections?.[3]?.content) && (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[3].description || pageData.sections[3].content) }} />
            )}
          </div>

          <div className={styles.flow_container}>
            {flowCards.map((card, idx) => (
              <React.Fragment key={idx}>
                <div className={styles.flow_card}>
                  {renderIcon(card.icon, styles.flow_icon, 32)}
                  <h4>{card.title}</h4>
                  <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(card.desc) }} />
                </div>
                {idx < flowCards.length - 1 && (
                  <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.getting_started}>
        <div className={styles.getting_started_left}>
          {!isEmptyHtml(pageData?.sections?.[4]?.title) && (
            <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[4].title) }} />
          )}
          {!isEmptyHtml(pageData?.sections?.[4]?.subtitle) && (
            <p className={styles.getting_started_tagline} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[4].subtitle) }} />
          )}
          {!isEmptyHtml(pageData?.sections?.[4]?.description || pageData?.sections?.[4]?.content) && (
            <p className={styles.getting_started_desc} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[4].description || pageData.sections[4].content) }} />
          )}
        </div>
        
        <div className={styles.getting_started_grid}>
          {steps.map((item) => (
            <div key={item.num} className={styles.step_card}>
              <span className={styles.step_num}>{item.num}</span>
              <div className={styles.step_icon}>
                {renderIcon(item.icon, undefined, 28)}
              </div>
              <h3>{item.title}</h3>
              <p className={styles.step_desc}>{item.desc}</p>
              <span className={styles.step_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      {/* ponytail: no testimonials/logos yet, hidden for now like on the homepage */}

      <section className={styles.final_combo}>
        <div className={styles.combo_card}>
          <span className={styles.combo_ring} aria-hidden="true" />
          <span className={styles.combo_ring_small} aria-hidden="true" />

          <div className={styles.combo_cta}>
            {!isEmptyHtml(pageData?.sections?.[5]?.title) && (
              <h2 className={styles.combo_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[5].title) }} />
            )}
            {!isEmptyHtml(pageData?.sections?.[5]?.subtitle) && (
              <p className={styles.combo_sub} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.sections[5].subtitle) }} />
            )}
            <Link href="/contact-us?type=Enterprise+Sales" className={styles.combo_btn}>Contact Entreprises</Link>
          </div>

          <div className={styles.combo_divider} aria-hidden="true" />

          <div className={styles.combo_download}>
            <h2 className={styles.combo_heading}>Application Commerçant</h2>
            {isMobile ? (
              <a href={merchantStoreUrl} target="_blank" rel="noopener noreferrer" className={styles.combo_btn}>
                <Icon icon="mdi:download" width={18} />
                <span>Télécharger</span>
              </a>
            ) : (
              <Image src={merchantQr} alt="Scannez pour télécharger l'application Pay10 Commerçant" className={styles.qr_image} width={140} height={140} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PosDevicesClient;
