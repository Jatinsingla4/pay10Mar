"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./CookieConsent.module.scss";

const STORAGE_KEY = "pay10_cookie_consent";
const CONSENT_VALID_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // localStorage is only available client-side, so this can't be read during
    // the initial render (would cause a hydration mismatch) — must check on mount.
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    const expired = !parsed || Date.now() - new Date(parsed.date).getTime() > CONSENT_VALID_MS;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (expired) setVisible(true);
  }, []);

  const setConsent = (value) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: new Date().toISOString() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={Style.overlay} role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <div className={Style.card}>
        <div className={Style.header}>
          <Image src="/images/common/logo.png" alt="Pay10" width={100} height={40} className={Style.logo} />
          <h2 id="cookie-consent-title" className={Style.title}>Manage Consent</h2>
          <button
            type="button"
            className={Style.closeBtn}
            aria-label="Close"
            onClick={() => setConsent("dismissed")}
          >
            &times;
          </button>
        </div>

        <div className={Style.body}>
          <p>
            To provide the best experiences, we use technologies like cookies to store and/or access
            device information. Consenting to these technologies will allow us to process data such as
            browsing behavior or unique IDs on this site. Not consenting or withdrawing consent, may
            adversely affect certain features and functions.
          </p>

          {showPreferences && (
            <div className={Style.preferences}>
              <div className={Style.prefRow}>
                <div>
                  <strong>Necessary</strong>
                  <p>Required for the website to function. Always active.</p>
                </div>
                <span className={Style.alwaysOn}>Always Active</span>
              </div>
              <div className={Style.prefRow}>
                <div>
                  <strong>Analytics</strong>
                  <p>Helps us understand how visitors use the site.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={Style.actions}>
          <button type="button" className={Style.acceptBtn} onClick={() => setConsent("accepted")}>
            Accept
          </button>
          <button type="button" className={Style.denyBtn} onClick={() => setConsent("denied")}>
            Deny
          </button>
          <button
            type="button"
            className={Style.prefsBtn}
            onClick={() => setShowPreferences((v) => !v)}
          >
            View preferences
          </button>
        </div>

        <div className={Style.links}>
          <Link href="/cookie-policy" target="_blank" rel="noopener noreferrer">Cookie Policy</Link>
          <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
