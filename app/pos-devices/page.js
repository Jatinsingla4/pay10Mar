import React from "react";
import Link from "next/link";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import MerchantTestimonialVideos from "@/app/components/ui/MerchantTestimonialVideos";
import MerchantLogosCTA from "@/app/components/ui/MerchantLogosCTA";
import { Icon } from "@iconify/react";
import styles from "./pos.module.scss";

export const metadata = {
  title: "POS Devices – Pay 10",
  description: "The new way to pay at every counter in the UAE.",
  alternates: {
    canonical: "https://pay10.ae/pos-devices",
  },
};

const PosDevicesPage = () => {
  return (
    <main className={styles.pos_page}>
      {/* Hero Banner Section */}
      <section className={styles.altareq_section}>
        <div className={styles.altareq_hero}>
          <div className={styles.altareq_hero_content}>
            <h1>
              The new way to pay<br />
              at every counter in the UAE.
            </h1>
            <p>
              Three devices. One ecosystem. All connected to the Pay10 Biz App, instant settlement, and 24/7 human support.
            </p>
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
          heading={
            <>
              <div className={styles.uae_label}>
                🇦🇪 UAE FIRST &middot; DYNAMIC QR TECHNOLOGY
              </div>
              <span className={styles.gradient_heading}>
                The UAE's first Dynamic QR POS device.<br/>A new era of in-person payments.
              </span>
            </>
          }
          subheading="Every Pay10 device generates a unique Dynamic QR code per transaction — created fresh, linked to the exact amount, confirmed instantly. Not a static sticker. Not a shared code. A live, secure QR generated every single time a customer pays."
          points={[
            "Dynamic QR generated per transaction - unique, amount-specific, instant",
            "Customer scans with Pay10 UAE App, payment confirmed in under 2 seconds",
            "Audio and visual confirmation on device with no ambiguity and no errors",
            "Static QR also supported for merchants who need both options",
            "Sound box confirmation with an audible payment alert in any environment",
            "UAE's first device family to bring DQR to in-store payments at scale"
          ]}
          imageSrc="/images/prod_imports/consumer-app-phone.png"
          imageAlt="Dynamic QR Technology"
          isReversed={false}
          isGreyBg={true}
        />

      <section className={styles.compare_section}>
        <div className={styles.container}>
          <div className={styles.compare_header}>
            <h2 className={styles.gradient_heading}>Choose the right device for your business</h2>
            <p>Whether you need an elegant countertop solution or a rugged mobile device, we have you covered.</p>
          </div>
          
          <div className={styles.compare_grid}>
            {[
              {
                name: 'P5',
                tagline: 'Elegant Design Meets Advanced Payment Capability.',
                image: '/images/prod_imports/P5.png',
                bestFor: 'Retail counters, restaurants, salons, and lifestyle stores where design matters as much as function. Pay10\'s flagship tabletop terminal — built on RTOS for rock-solid stability.',
                design: 'Proprietary Pay10 premium minimalist, gold accent',
                display: { customer: '3.98" full-colour + 1" merchant', merchant: '1" monochrome LCD' },
                payment: {
                  dqr: '✓ Unique QR per transaction',
                  sqr: 'Supported',
                  tap: 'DQR+Card variant only',
                  dip: 'DQR+Card variant only'
                },
                variants: 'P5 DQR\nP5 DQR+Card',
                hardware: {
                  os: 'RTOS — built for payment stability',
                  keypad: 'Tilted keypad for fast, accessible input',
                  battery: '2600 mAh Li-ion extended uptime',
                  charging: 'USB Type-C'
                },
                connectivity: {
                  sim: '✓ Micro SIM — pre-installed',
                  wifi: 'NA',
                  gps: 'NA'
                },
                alerts: {
                  audio: '✓ Loudspeaker sound box',
                  visual: '✓ On-screen confirmation'
                },
                management: {
                  ota: '✓ Remote software push',
                  config: 'Via Pay10 Biz portal',
                  pci: 'Level 1 certified',
                  app: 'Register and manage via app'
                }
              },
              {
                name: 'POS10',
                tagline: 'Smart, Simple, and Secure QR Payments for Every Counter.',
                image: '/images/prod_imports/POS10.png',
                bestFor: 'Small businesses, quick-service counters, and retail merchants who need a reliable, QR-focused countertop terminal — compact, affordable, and built to run all day.',
                design: 'Compact countertop — small footprint, no gold accent',
                display: { customer: '3.98" full-colour customer', merchant: '1" monochrome LCD' },
                payment: {
                  dqr: '✓ Unique QR per transaction',
                  sqr: 'Supported',
                  tap: 'N/A',
                  dip: 'NA'
                },
                variants: 'POS10 DQR',
                hardware: {
                  os: 'RTOS — built for payment stability',
                  keypad: 'Standard tactile keypad',
                  battery: '2600 mAh — all-day performance',
                  charging: 'USB Type-C'
                },
                connectivity: {
                  sim: '✓ Micro SIM — pre-installed',
                  wifi: 'NA',
                  gps: 'GPS / GNSS'
                },
                alerts: {
                  audio: '✓ Loudspeaker sound box',
                  visual: '✓ RGB LED strip + on-screen'
                },
                management: {
                  ota: '✓ Remote software push',
                  config: 'Via Pay10 Biz portal',
                  pci: 'Level 1 certified',
                  app: 'Register and manage via app'
                }
              },
              {
                name: 'P10',
                tagline: 'Rugged Mobility for Payments on the Go. (Coming Soon)',
                image: '/images/prod_imports/P10.png',
                bestFor: 'Delivery fleets, logistics operators, in-flight transactions, and field sales agents who need a durable, Android-powered payment device that works wherever business happens.',
                design: 'Rugged handheld — durable mobile form factor',
                display: { customer: 'Full colour high-visibility screen', merchant: 'N/A — single screen device' },
                payment: {
                  dqr: '✓ Unique QR per transaction',
                  sqr: 'NA',
                  tap: 'DQR+Card variant only',
                  dip: 'DQR+Card variant only'
                },
                variants: 'P10 DQR\nP10 DQR+Card',
                hardware: {
                  os: 'Android — familiar, flexible, app-ready',
                  keypad: 'Integrated — fast delivery payment entry',
                  battery: 'High-capacity Li-ion — extended mobile use',
                  charging: 'USB Type-C'
                },
                connectivity: {
                  sim: '✓ Micro SIM — pre-installed',
                  wifi: '✓ Built-in Wi-Fi',
                  gps: 'NA'
                },
                alerts: {
                  audio: '✓ Built-in loudspeaker',
                  visual: '✓ On-screen confirmation'
                },
                management: {
                  ota: '✓ Remote software push',
                  config: 'Via Pay10 Biz portal',
                  pci: 'Level 1 certified',
                  app: 'Register and manage via app'
                }
              }
            ].map((device, idx) => (
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
                    <span className={styles.lbl}>Best for</span>
                    <span className={styles.val}>{device.bestFor}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Design</span>
                    <span className={styles.val}>{device.design}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Variants</span>
                    <span className={styles.val} style={{whiteSpace: 'pre-line'}}>{device.variants}</span>
                  </div>
                </div>

                <div className={styles.section_title}>DISPLAY</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Customer</span>
                    <span className={styles.val}>{device.display.customer}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Merchant</span>
                    <span className={styles.val}>{device.display.merchant}</span>
                  </div>
                </div>

                <div className={styles.section_title}>PAYMENT METHODS</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Dynamic QR</span>
                    <span className={styles.val}>{device.payment.dqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Static QR</span>
                    <span className={styles.val}>{device.payment.sqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>TAP (Contactless)</span>
                    <span className={styles.val}>{device.payment.tap}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>DIP (Chip)</span>
                    <span className={styles.val}>{device.payment.dip}</span>
                  </div>
                </div>

                <div className={styles.section_title}>HARDWARE & CONNECTIVITY</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>OS</span>
                    <span className={styles.val}>{device.hardware.os}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Keypad</span>
                    <span className={styles.val}>{device.hardware.keypad}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Battery</span>
                    <span className={styles.val}>{device.hardware.battery}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Connectivity</span>
                    <span className={styles.val}>{device.connectivity.sim}<br/>{device.connectivity.wifi !== 'NA' ? device.connectivity.wifi : ''}</span>
                  </div>
                </div>

                <div className={styles.section_title}>ALERTS & MANAGEMENT</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Audio/Visual</span>
                    <span className={styles.val}>{device.alerts.audio}<br/>{device.alerts.visual}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Compliance</span>
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
            <h2 className={styles.gradient_heading}>Every Pay10 device. The same guarantee.</h2>
            <p>Whether you choose the POS10, P5, or P10 — every device ships with the same core capabilities, the same security standards, and the same Pay10 commitment.</p>
          </div>

          <div className={styles.guarantee_grid}>
            {[
              {
                title: '1 Dynamic QR on every device',
                desc: "UAE's first DQR device family — unique QR per transaction, every time.",
                icon: 'mdi:qrcode-scan'
              },
              {
                title: '2 OTA updates',
                desc: 'Software pushed remotely — no engineer visit, no downtime, always current.',
                icon: 'mdi:cloud-download-outline'
              },
              {
                title: '3 Remote configuration',
                desc: 'Manage all devices centrally from the Pay10 Biz portal — any location.',
                icon: 'mdi:remote-desktop'
              },
              {
                title: '4 PCI-DSS certified',
                desc: 'Every device ships pre-certified — compliance built in, not bolted on.',
                icon: 'mdi:shield-check-outline'
              },
              {
                title: '5 Audio confirmation',
                desc: 'Loudspeaker alert on every payment — no ambiguity, no silent failures.',
                icon: 'mdi:volume-high'
              },
              {
                title: '6 SIM pre-installed',
                desc: 'Ships ready to connect — dedicated 4G SIM pre-installed, no setup needed.',
                icon: 'mdi:sim'
              },
              {
                title: '7 Delivered & installed',
                desc: 'Pay10 team delivers and sets up your device at your premises — you just start accepting.',
                icon: 'mdi:truck-delivery-outline'
              },
              {
                title: '8 Pay10 Biz App linked',
                desc: 'Every device links to the Pay10 Biz UAE App — one tap to register, manage, and monitor.',
                icon: 'mdi:cellphone-link'
              }
            ].map((item, idx) => (
              <div key={idx} className={styles.guarantee_card}>
                <div className={styles.icon_wrap}>
                  <Icon icon={item.icon} className={styles.card_icon} />
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
              <span className={styles.flow_h2}>Your device is the start.</span>
              <span className={styles.flow_h3}>The ecosystem is what makes it powerful.</span>
            </div>
            <p>
              Every Pay10 POS device connects into a complete merchant ecosystem — the Pay10 Biz UAE App, the Merchant Portal, instant settlement, and 24/7 human support. It's not a standalone terminal. It's the physical entry point to Pay10's full payment infrastructure.
            </p>
          </div>

          <div className={styles.flow_container}>
            <div className={styles.flow_card}>
              <Icon icon="mdi:monitor-cellphone" className={styles.flow_icon} />
              <h4>DQR Device</h4>
              <span>POS10 &bull; P5 &bull; P10</span>
            </div>
            
            <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
            
            <div className={styles.flow_card}>
              <Icon icon="mdi:cellphone-cog" className={styles.flow_icon} />
              <h4>Pay10 Biz App</h4>
              <span>Manage &bull; Monitor &bull; Link</span>
            </div>
            
            <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
            
            <div className={styles.flow_card}>
              <Icon icon="mdi:laptop-mac" className={styles.flow_icon} />
              <h4>Merchant Portal</h4>
              <span>Transactions &bull; VAT &bull; Reports</span>
            </div>
            
            <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
            
            <div className={styles.flow_card}>
              <Icon icon="mdi:lightning-bolt" className={styles.flow_icon} />
              <h4>Instant Settlement</h4>
              <span>T+0 &bull; Same day &bull; Always</span>
            </div>

            <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
            
            <div className={styles.flow_card}>
              <Icon icon="mdi:headset" className={styles.flow_icon} />
              <h4>24/7 Support</h4>
              <span>Human &bull; Multi-language</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.getting_started}>
        <div className={styles.getting_started_left}>
          <h2 className={styles.gradient_heading}>Lets get you Started</h2>
          <p className={styles.getting_started_tagline}>From box to first payment. In 4 steps.</p>
          <p className={styles.getting_started_desc}>Pay10 delivers and sets up your device. Here's what happens after it arrives, straight from the device manual.</p>
        </div>
        
        <div className={styles.getting_started_grid}>
          {[
            {
              num: '1',
              icon: 'mdi:power',
              title: 'Power on',
              desc: 'Charge fully. Hold Power button 3 seconds. Device boots and displays registration QR on customer screen.'
            },
            {
              num: '2',
              icon: 'mdi:cellphone',
              title: 'Open Pay10 Biz UAE App',
              desc: 'Login with your merchant credentials. Tap Manage Devices on the home screen.'
            },
            {
              num: '3',
              icon: 'mdi:qrcode-scan',
              title: 'Register the device',
              desc: 'Select your device from the list. Tap Register. Scan the QR on the device screen. Confirm. Status changes to Active.'
            },
            {
              num: '4',
              icon: 'mdi:check-decagram-outline',
              title: 'Verify & start accepting',
              desc: 'Run a test transaction: AED amount, Dynamic QR generated, customer scans, audio + visual confirmation. You\'re live.'
            }
          ].map((item) => (
            <div key={item.num} className={styles.step_card}>
              <span className={styles.step_num}>{item.num}</span>
              <div className={styles.step_icon}>
                <Icon icon={item.icon} width="28" height="28" />
              </div>
              <h3>{item.title}</h3>
              <p className={styles.step_desc}>{item.desc}</p>
              <span className={styles.step_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      <MerchantTestimonialVideos />
      <MerchantLogosCTA showCta={false} />

      <section className={styles.biz_final_cta}>
        <h2 className={styles.cta_heading}>Ready to accept payments<br/>the new UAE way?</h2>
        <p className={styles.cta_sub}>Our team delivers, installs, and activates your DQR device. You start accepting payments instantly. Lowest MDR. Same-day settlement. 24/7 human support. CBUAE licensed.</p>
        <div className={styles.cta_buttons}>
          <Link href="/contact-us?type=Enterprise+Sales" className={styles.cta_btn_primary}>Enterprise Sales</Link>
        </div>
      </section>

      <section className={styles.biz_app_download}>
        <h2 className={styles.app_download_heading}>Merchant App</h2>
        <div className={styles.app_download_badges}>
          <a href="#" className={styles.app_badge} aria-label="Download on the App Store">
            <Icon icon="ic:baseline-apple" width={28} />
            <div>
              <span>Download on the</span>
              <strong>App Store</strong>
            </div>
          </a>
          <a href="#" className={styles.app_badge} aria-label="Get it on Google Play">
            <Icon icon="logos:google-play-icon" width={24} />
            <div>
              <span>GET IT ON</span>
              <strong>Google Play</strong>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
};

export default PosDevicesPage;
