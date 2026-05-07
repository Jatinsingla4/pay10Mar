"use client";

import React, { useEffect, useState } from "react";
import useApiAuth from "../components/hooks/useApiAuth";
import PageLoader from "../components/ui/PageLoader";
import { formatFaqRichText } from "../faq-customer-app/formatFaqMarks";
import {
  buildKfsToc,
  normalizeKfsBizPayload,
  normalizeKfsHero,
} from "./kfsBizApiNormalize";
import Style from "./kfs-biz-app.module.scss";

const KFS_ENDPOINT = "/page/kfs-biz-app";

const scrollToBlock = (id) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/**
 * KFS Merchant App — `/page/kfs-biz-app` only (no hardcoded copy).
 */
const KfsBizAppClient = () => {
  const { makeApiCall } = useApiAuth();
  const [loading, setLoading] = useState(true);
  /** @type {'ok' | 'error' | 'empty'} */
  const [loadState, setLoadState] = useState("ok");
  /** @type {ReturnType<typeof normalizeKfsBizPayload>} */
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const result = await makeApiCall(KFS_ENDPOINT);
        if (!mounted) return;

        if (!result?.status) {
          setPayload(null);
          setLoadState("error");
          return;
        }

        const normalized = normalizeKfsBizPayload(result);
        if (normalized) {
          setPayload(normalized);
          setLoadState("ok");
        } else {
          setPayload(null);
          setLoadState("empty");
        }
      } catch {
        if (!mounted) return;
        setPayload(null);
        setLoadState("error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [makeApiCall]);

  useEffect(() => {
    if (!payload || payload.type !== "structured") return;
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const toc = buildKfsToc(payload);
    if (toc.some((t) => t.id === hash)) {
      requestAnimationFrame(() => scrollToBlock(hash));
    }
  }, [payload]);

  if (loading) {
    return <PageLoader />;
  }

  if (loadState !== "ok" || !payload) {
    const hero = normalizeKfsHero(undefined);

    return (
      <main className={Style.main}>
        <header className={Style.heroBanner}>
          <div className={Style.heroInner}>
            <p className={Style.heroKicker}>{hero.kicker}</p>
            <h1 className={Style.heroTitle}>{hero.title}</h1>
          </div>
        </header>
        <div className={Style.contentShell}>
          <p className={Style.emptyState} role="status">
            {loadState === "error"
              ? "We couldn’t load this page. Please try again later."
              : "No Key Facts content is available."}
          </p>
        </div>
      </main>
    );
  }

  if (payload.type === "html") {
    return (
      <main className={Style.main}>
        <header className={Style.heroBanner}>
          <div className={Style.heroInner}>
            <p className={Style.heroKicker}>{payload.hero.kicker}</p>
            <h1 className={Style.heroTitle}>{payload.hero.title}</h1>
          </div>
        </header>
        <div className={Style.contentShell}>
          <div
            className={Style.contentHtml}
            dangerouslySetInnerHTML={{ __html: payload.html }}
          />
        </div>
      </main>
    );
  }

  const toc = buildKfsToc(payload);

  return (
    <main className={Style.main}>
      <header className={Style.heroBanner}>
        <div className={Style.heroInner}>
          <p className={Style.heroKicker}>{payload.hero.kicker}</p>
          <h1 className={Style.heroTitle}>{payload.hero.title}</h1>
        </div>
      </header>

      <div className={Style.contentShell}>
        {toc.length > 0 ? (
          <div className={Style.block} aria-labelledby="kfs-toc-heading">
            <h2 className={Style.sectionTitle} id="kfs-toc-heading">
              <span className={Style.sectionTitleAccent} aria-hidden="true" />
              Table of Contents
            </h2>
            <nav className={Style.tocNav} aria-label="Table of contents">
              <ul>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToBlock(item.id);
                        try {
                          window.history.replaceState(null, "", `#${item.id}`);
                        } catch {
                          /* noop */
                        }
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : null}

        {payload.intro || payload.tableRows.length > 0 ? (
          <section
            id="kfs-overview"
            className={Style.block}
            aria-labelledby="kfs-overview-heading"
          >
            <h2 className={Style.sectionTitle} id="kfs-overview-heading">
              <span className={Style.sectionTitleAccent} aria-hidden="true" />
              Overview &amp; key facts
            </h2>

            {payload.intro ? (
              <p className={Style.intro}>{payload.intro}</p>
            ) : null}

            {payload.tableRows.length > 0 ? (
              <div className={Style.tableWrap}>
                <table className={Style.table}>
                  <tbody>
                    {payload.tableRows.map((row, idx) => (
                      <tr key={`${idx}-${row.label}`}>
                        <th scope="row">{row.label}</th>
                        <td>{formatFaqRichText(row.value, Style.supportLink)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ) : null}

        {payload.importantNotes.length > 0 ? (
          <section
            id="kfs-important-notes"
            className={Style.block}
            aria-labelledby="kfs-important-heading"
          >
            <h2 className={Style.sectionTitle} id="kfs-important-heading">
              <span className={Style.sectionTitleAccent} aria-hidden="true" />
              Important Notes
            </h2>
            <ul className={Style.noteList}>
              {payload.importantNotes.map((note, idx) => (
                <li key={`${idx}-${note.slice(0, 40)}`}>{note}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {payload.warningItems.length > 0 ||
        payload.warningIntro ||
        payload.termsClosing ? (
          <section
            id="kfs-warning"
            className={Style.block}
            aria-labelledby="kfs-warning-heading"
          >
            <h2 className={Style.sectionTitle} id="kfs-warning-heading">
              <span className={Style.sectionTitleAccent} aria-hidden="true" />
              Warning
            </h2>
            {payload.warningIntro ? (
              <p className={Style.warningIntro}>{payload.warningIntro}</p>
            ) : null}
            {payload.warningItems.length > 0 ? (
              <ol className={Style.warningList}>
                {payload.warningItems.map((text, idx) => (
                  <li key={`${idx}-${text.slice(0, 40)}`}>{text}</li>
                ))}
              </ol>
            ) : null}
            {payload.termsClosing ? (
              <p className={Style.closing}>
                {formatFaqRichText(payload.termsClosing, Style.supportLink)}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default KfsBizAppClient;
