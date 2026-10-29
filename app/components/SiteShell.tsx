"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LocaleProvider, type Locale, useLocale } from "@/app/lib/i18n";

const primaryLinks = ["home", "hazards", "relays", "drills", "templates", "regions", "join"];
const moreLinks = ["about", "method", "contact", "privacy", "terms", "group"];

function ShellContent({ children }: { children: React.ReactNode }) {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCookieVisible(!window.localStorage.getItem("caleb-watch-cookie-consent")), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 140);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, smoothWheel: true });
    return () => lenis.destroy();
  }, []);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const dismissCookie = (choice: "accepted" | "rejected") => {
    window.localStorage.setItem("caleb-watch-cookie-consent", choice);
    setCookieVisible(false);
  };

  const toggleVoice = () => {
    if (!("speechSynthesis" in window)) return;
    if (voicePlaying) {
      window.speechSynthesis.cancel();
      setVoicePlaying(false);
      return;
    }
    const tourCopy = {
      en: "Welcome to Caleb Watch. See early. Act together. Explore practical guides for hazards, relays and community drills. Always follow national alerts and local authorities.",
      sw: "Karibu Caleb Watch. Ona mapema. Chukua hatua pamoja. Tazama miongozo ya vitendo kuhusu hatari, mawasiliano na mazoezi ya jamii. Fuata tahadhari rasmi na mamlaka za eneo lako.",
      fr: "Bienvenue sur Caleb Watch. Voir tôt. Agir ensemble. Découvrez des guides pratiques sur les risques, les relais et les exercices communautaires. Suivez toujours les alertes officielles et les autorités locales."
    };
    const utterance = new SpeechSynthesisUtterance(tourCopy[locale]);
    utterance.lang = locale === "sw" ? "sw-KE" : locale === "fr" ? "fr-FR" : "en-KE";
    utterance.rate = 0.94;
    utterance.onend = () => setVoicePlaying(false);
    utterance.onerror = () => setVoicePlaying(false);
    setVoicePlaying(true);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const hrefFor = (key: string) => key === "home" ? "/" : `/${key}`;
  const isCurrent = (key: string) => key === "home" ? pathname === "/" : pathname === `/${key}`;

  return (
    <>
      <a className="cw-skip-link" href="#main-content">Skip to content</a>
      <header className="cw-site-header">
        <div className="header-area">
          <div className="main-header">
            <div className="header-top black-bg d-none d-md-block">
              <div className="container">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="header-info-left"><ul><li><span className="fas fa-circle cw-live-dot" aria-hidden="true" />{t.notice}</li></ul></div>
                  <div className="header-info-right"><span className="cw-top-note">Community preparedness, made practical</span></div>
                </div>
              </div>
            </div>
            <div className="header-mid d-none d-md-block">
              <div className="container">
                <div className="row d-flex align-items-center">
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <Link href="/" className="cw-brand" aria-label="Caleb Watch home">
                      <span className="cw-brand-mark" aria-hidden="true">CW</span>
<span><strong>Caleb <em>Watch</em></strong><small>{t.tagline}</small></span>
                    </Link>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8">
                    <div className="cw-header-callout">
                      <span className="fas fa-bullhorn" aria-hidden="true" />
                      <span>Prepare together. Share clearly. Act early.</span>
                      <Link href="/join" className="cw-callout-link">{t.join} <span aria-hidden="true">›</span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`header-bottom header-sticky${sticky ? " sticky-bar" : ""}`}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-10 col-lg-10 col-md-12 header-flex">
                    <div className="sticky-logo"><Link href="/" className="cw-sticky-brand"><span className="cw-brand-mark" aria-hidden="true">CW</span><strong>Caleb <em>Watch</em></strong></Link></div>
                    <nav className="main-menu d-none d-md-block" aria-label="Main navigation">
                      <ul id="navigation">
                        {primaryLinks.map((key) => <li key={key}><Link href={hrefFor(key)} aria-current={isCurrent(key) ? "page" : undefined}>{t.nav[key]}</Link></li>)}
                        <li className="cw-more-menu"><button type="button" aria-haspopup="true" aria-expanded={moreOpen} onClick={() => setMoreOpen((open) => !open)}>{t.more} <span className="fas fa-angle-down" aria-hidden="true" /></button><ul className={`submenu${moreOpen ? " cw-submenu-open" : ""}`}>{moreLinks.map((key) => <li key={key}><Link href={hrefFor(key)} aria-current={isCurrent(key) ? "page" : undefined}>{t.nav[key]}</Link></li>)}</ul></li>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-12 cw-nav-actions">
                    <label className="cw-language-label" htmlFor="language-select">{t.language}</label>
                    <select id="language-select" className="cw-language-select" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label={t.language}>
                      <option value="en">EN</option><option value="sw">SW</option><option value="fr">FR</option>
                    </select>
                    <button type="button" className="cw-menu-toggle d-md-none" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
                      <span className="fas fa-bars" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {menuOpen && <nav className="cw-mobile-nav d-md-none" aria-label="Mobile navigation"><ul>{[...primaryLinks, ...moreLinks].map((key) => <li key={key}><Link href={hrefFor(key)} onClick={() => setMenuOpen(false)} aria-current={isCurrent(key) ? "page" : undefined}>{t.nav[key]}</Link></li>)}</ul></nav>}
              </div>
            </div>
            <div className="cw-mobile-brand d-md-none container">
              <Link href="/" className="cw-brand" aria-label="Caleb Watch home"><span className="cw-brand-mark" aria-hidden="true">CW</span><span><strong>Caleb <em>Watch</em></strong><small>{t.tagline}</small></span></Link>
              <span className="cw-mobile-notice">{t.notice}</span>
            </div>
          </div>
        </div>
      </header>

      {children}

      <footer className="cw-footer">
        <div className="footer-area footer-padding fix">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-4 col-lg-4 col-md-6">
                <Link href="/" className="cw-brand cw-footer-brand"><span className="cw-brand-mark" aria-hidden="true">CW</span><span><strong>Caleb <em>Watch</em></strong><small>{t.tagline}</small></span></Link>
                <p className="cw-footer-about">{t.footerAbout}</p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 cw-footer-links"><h4>Explore</h4><ul>{primaryLinks.slice(1, 6).map((key) => <li key={key}><Link href={hrefFor(key)}>{t.nav[key]}</Link></li>)}</ul></div>
              <div className="col-xl-2 col-lg-2 col-md-6 cw-footer-links"><h4>About</h4><ul>{["about", "method", "contact", "privacy", "terms"].map((key) => <li key={key}><Link href={hrefFor(key)}>{t.nav[key]}</Link></li>)}</ul></div>
              <div className="col-xl-3 col-lg-3 col-md-6 cw-footer-contact"><h4>Stay connected</h4><p>Ask a question or share what your group is learning.</p><a href="https://wa.me/254112272061" target="_blank" rel="noreferrer" aria-label={t.waLabel}><span className="fab fa-whatsapp" aria-hidden="true" /> +254 112 272 061</a><p>WhatsApp is our direct contact route.</p></div>
            </div>
            <div className="cw-disclaimer"><strong>{t.disclaimerTitle}</strong><p>{t.disclaimer}</p></div>
            <div className="footer-bottom-area"><div className="container"><div className="footer-border"><div className="row d-flex align-items-center"><div className="col-lg-12"><div className="footer-copy-right"><p>© {new Date().getFullYear()} Caleb Watch. Built for community readiness.</p></div></div></div></div></div></div>
          </div>
        </div>
      </footer>

      <div className={`cw-floating-actions${cookieVisible ? " cw-floating-with-cookie" : ""}`} aria-label="Quick actions">
        <button className="cw-voice-button" type="button" onClick={toggleVoice} aria-pressed={voicePlaying} aria-label={voicePlaying ? t.stopVoice : t.voice} title={voicePlaying ? t.stopVoice : t.voice}>
          <span className={`fas ${voicePlaying ? "fa-stop" : "fa-volume-up"}`} aria-hidden="true" /> <span>{voicePlaying ? t.stopVoice : t.voice}</span>
        </button>
        <a className="cw-whatsapp-button" href="https://wa.me/254112272061" target="_blank" rel="noreferrer" aria-label={t.waLabel} title={t.waLabel}><span className="fab fa-whatsapp" aria-hidden="true" /><span>WhatsApp</span></a>
      </div>

      {cookieVisible && <aside className="cw-cookie-banner" role="dialog" aria-labelledby="cookie-heading" aria-describedby="cookie-copy">
        <div><strong id="cookie-heading">{t.cookieTitle}</strong><p id="cookie-copy">{t.cookieText}</p></div>
        <div className="cw-cookie-actions"><button type="button" className="cw-cookie-accept" onClick={() => dismissCookie("accepted")}>{t.accept}</button><button type="button" className="cw-cookie-reject" onClick={() => dismissCookie("rejected")}>{t.reject}</button></div>
      </aside>}
    </>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return <LocaleProvider><ShellContent>{children}</ShellContent></LocaleProvider>;
}
