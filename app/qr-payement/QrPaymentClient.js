"use client";

import React from "react";
import Link from "next/link";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { Icon } from "@iconify/react";
// Reuses the POS Devices page's stylesheet - same section patterns (feature
// intro, icon-card grid, numbered steps, combo CTA) fit this page too, and
// CSS Modules namespace the class names so there's no collision between pages.
import styles from "../pos-devices/pos.module.scss";
import { isEmptyHtml, sanitizeHtml } from "@/app/lib/sanitizeHtml";
import { bannerBgStyle } from "@/app/lib/bannerBgStyle";

const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

const DEFAULT_FEATURE_POINTS = [
  "Réglez vos achats du quotidien instantanément et en toute sécurité",
  "Scannez le QR Code du commerçant et confirmez votre paiement",
  "Une expérience simple, rapide et fluide",
];

const DEFAULT_ADVANTAGES = [
  { title: "Paiement instantané et sécurisé par QR Code", icon: "mdi:qrcode-scan" },
  { title: "Expérience simple et fluide", icon: "mdi:lightning-bolt" },
  { title: "Pas besoin de carte bancaire ni d'espèces", icon: "mdi:credit-card-off-outline" },
  { title: "Confirmation rapide de votre transaction", icon: "mdi:check-circle-outline" },
  { title: "Gestion de vos transactions directement dans l'application", icon: "mdi:cellphone-check" },
];

const DEFAULT_INTEROP_POINTS = [
  { title: "Paiements QR interopérables", icon: "mdi:qrcode" },
  { title: "Acceptation multi-wallet", icon: "mdi:wallet-outline" },
  { title: "Expérience de paiement simplifiée", icon: "mdi:lightning-bolt-outline" },
  { title: "Écosystème de paiement plus ouvert et inclusif", icon: "mdi:account-group-outline" },
];

const DEFAULT_STEPS = [
  { num: "1", title: "Scannez", desc: "Ouvrez votre application Pay10 et scannez le QR Code affiché chez le commerçant." },
  { num: "2", title: "Vérifiez", desc: "Vérifiez le montant de votre achat avant de confirmer." },
  { num: "3", title: "Payez", desc: "Validez le paiement directement depuis votre application." },
  { num: "4", title: "C'est payé !", desc: "Recevez instantanément la confirmation de votre transaction." },
];

const QrPaymentClient = ({ pageData = null }) => {
  // --- 0. Feature intro ("Paiement par QR Code") ---
  const featureSection = pageData?.sections?.[0];
  const featureSubheading = !isEmptyHtml(featureSection?.content)
    ? featureSection.content.replace(/<[^>]*>?/gm, '').trim()
    : "Avec Pay10, réglez vos achats chez les commerçants partenaires grâce au paiement par QR Code. Plus besoin de chercher votre carte ou de gérer les espèces : votre smartphone devient votre portefeuille.";
  const featurePoints = featureSection?.cards?.length
    ? featureSection.cards.map(c => c.title).filter(Boolean)
    : DEFAULT_FEATURE_POINTS;

  // --- 1. Avantages ---
  const advantagesSection = pageData?.sections?.[1];
  const advantages = advantagesSection?.cards?.length
    ? advantagesSection.cards.map(c => ({ title: c.title, icon: c.icon }))
    : DEFAULT_ADVANTAGES;

  // --- 2. Interopérabilité MarocPay ---
  const interopSection = pageData?.sections?.[2];
  const interopPoints = interopSection?.cards?.length
    ? interopSection.cards.map(c => ({ title: c.title, icon: c.icon }))
    : DEFAULT_INTEROP_POINTS;

  // --- 3. Comment ça marche ---
  const stepsSection = pageData?.sections?.[3];
  const steps = stepsSection?.cards?.length
    ? stepsSection.cards.map((c, i) => ({
        num: `${i + 1}`,
        title: c.title,
        // CMS entry has the step text in `subtitle` rather than `content`/`description`.
        desc: ((!isEmptyHtml(c.content) ? c.content : c.subtitle) || "").replace(/<[^>]*>?/gm, '').trim(),
        icon: c.icon,
      }))
    : DEFAULT_STEPS;

  return (
    <main className={styles.pos_page}>
      {/* Hero */}
      <section className={styles.altareq_section}>
        <div className={styles.altareq_hero} style={bannerBgStyle(pageData)}>
          <div className={styles.altareq_hero_content}>
            {!isEmptyHtml(pageData?.page_title) ? (
              <h1 dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_title) }} />
            ) : (
              <h1>Scannez. Payez. C&rsquo;est réglé.</h1>
            )}
            {!isEmptyHtml(pageData?.page_subtitle) ? (
              <p className={styles.altareq_hero_subtitle} dangerouslySetInnerHTML={{ __html: sanitizeHtml(pageData.page_subtitle) }} />
            ) : (
              <p className={styles.altareq_hero_subtitle}>
                Payez vos achats du quotidien instantanément et en toute sécurité avec Pay10. Scannez le QR Code du commerçant, confirmez votre paiement et profitez d&rsquo;une expérience de paiement simple, rapide et fluide.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Paiement par QR Code */}
      <ConsumerFeatureSection
        heading={
          <>
            {!isEmptyHtml(featureSection?.subtitle) ? (
              <div className={styles.uae_label} dangerouslySetInnerHTML={{ __html: sanitizeHtml(featureSection.subtitle) }} />
            ) : (
              <div className={styles.uae_label}>Paiement par QR Code</div>
            )}
            {!isEmptyHtml(featureSection?.title) ? (
              <span className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(featureSection.title) }} />
            ) : (
              <span className={styles.gradient_heading}>Payez simplement. Directement depuis votre mobile.</span>
            )}
          </>
        }
        subheading={featureSubheading}
        points={featurePoints}
        imageSrc={featureSection?.images?.[0] || "/images/prod_imports/consumer-app-phone.png"}
        imageAlt="Paiement par QR Code"
        isReversed={false}
        isGreyBg={true}
      />

      {/* Avantages */}
      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            {!isEmptyHtml(advantagesSection?.title) ? (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(advantagesSection.title) }} />
            ) : (
              <h2 className={styles.gradient_heading}>Avantages</h2>
            )}
          </div>

          <div className={styles.guarantee_grid}>
            {advantages.map((item, idx) => (
              <div key={idx} className={styles.guarantee_card}>
                <div className={styles.icon_wrap}>
                  {renderIcon(item.icon, styles.card_icon, 18)}
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interopérabilité MarocPay */}
      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            {!isEmptyHtml(interopSection?.title) ? (
              <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.title) }} />
            ) : (
              <h2 className={styles.gradient_heading}>Interopérabilité MarocPay</h2>
            )}
            {!isEmptyHtml(interopSection?.subtitle) ? (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.subtitle) }} />
            ) : (
              <p>Un QR Code. Plusieurs Wallets.</p>
            )}
            {!isEmptyHtml(interopSection?.content) ? (
              <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(interopSection.content) }} />
            ) : (
              <p>Grâce à son intégration dans l&rsquo;écosystème MarocPay, Pay10 contribue à une expérience de paiement interopérable. Payez auprès des commerçants équipés et bénéficiez d&rsquo;un parcours de paiement rapide, sécurisé et unifié.</p>
            )}
          </div>

          <div className={styles.guarantee_grid}>
            {interopPoints.map((item, idx) => (
              <div key={idx} className={styles.guarantee_card}>
                <div className={styles.icon_wrap}>
                  {renderIcon(item.icon, styles.card_icon, 18)}
                </div>
                <h4>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className={styles.getting_started}>
        <div className={styles.getting_started_left}>
          <h2 className={styles.gradient_heading}>Comment ça marche ?</h2>
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

      {/* Découvrez nos solutions */}
      <section className={styles.final_combo}>
        <div className={styles.combo_card}>
          <span className={styles.combo_ring} aria-hidden="true" />
          <span className={styles.combo_ring_small} aria-hidden="true" />

          <div className={styles.combo_cta}>
            <h2 className={styles.combo_heading}>Découvrez nos solutions</h2>
            <Link href="/pay10-uae-app" className={styles.combo_btn}>
              <Icon icon="mdi:cellphone" width={18} />
              <span>Pay10</span>
            </Link>
          </div>

          <div className={styles.combo_divider} aria-hidden="true" />

          <div className={styles.combo_download}>
            <h2 className={styles.combo_heading}>&nbsp;</h2>
            <Link href="/pay10-biz-uae-app" className={styles.combo_btn}>
              <Icon icon="mdi:store" width={18} />
              <span>Pay10 Biz</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QrPaymentClient;
