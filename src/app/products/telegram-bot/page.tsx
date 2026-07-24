"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ROUTE_NAV } from "@/data/nav";

/* ─── Telegram Chat Mockup ─── */
function TelegramMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          const delays = [300, 1200, 2400, 3200, 4400];
          delays.forEach((delay, i) => {
            setTimeout(() => setVisibleMessages(i + 1), delay);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (mockupRef.current) observer.observe(mockupRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tg-mockup" ref={mockupRef}>
      <div className="tg-header">
        <div className="tg-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <div className="tg-header-info">
          <span className="tg-header-name">MembershipBot</span>
          <span className="tg-header-status">online</span>
        </div>
      </div>
      <div className="tg-messages">
        {/* User sends /start */}
        <div className={`tg-msg tg-msg--user ${visibleMessages >= 1 ? "tg-msg--visible" : ""}`}>
          <div className="tg-bubble tg-bubble--user">/start</div>
        </div>

        {/* Typing indicator */}
        {visibleMessages >= 1 && visibleMessages < 2 && (
          <div className="tg-msg tg-msg--bot tg-msg--visible">
            <div className="tg-bubble tg-bubble--bot tg-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* Bot reply with plan buttons */}
        <div className={`tg-msg tg-msg--bot ${visibleMessages >= 2 ? "tg-msg--visible" : ""}`}>
          <div className="tg-bubble tg-bubble--bot">
            Welcome to <strong>Your Community</strong>! Choose your plan:
            <div className="tg-buttons">
              <span className="tg-btn">Weekly: £9.99</span>
              <span className="tg-btn">Monthly: £24.99</span>
              <span className="tg-btn">Quarterly: £59.99</span>
              <span className="tg-btn">Yearly: £199.99</span>
            </div>
          </div>
        </div>

        {/* User taps Monthly */}
        <div className={`tg-msg tg-msg--user ${visibleMessages >= 3 ? "tg-msg--visible" : ""}`}>
          <div className="tg-bubble tg-bubble--user">Monthly: £24.99</div>
        </div>

        {/* Typing indicator */}
        {visibleMessages >= 3 && visibleMessages < 4 && (
          <div className="tg-msg tg-msg--bot tg-msg--visible">
            <div className="tg-bubble tg-bubble--bot tg-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        {/* Bot confirms with invite links */}
        <div className={`tg-msg tg-msg--bot ${visibleMessages >= 4 ? "tg-msg--visible" : ""}`}>
          <div className="tg-bubble tg-bubble--bot">
            Payment complete! Here are your invite links:
            <div className="tg-links">
              <span className="tg-link"># Announcements</span>
              <span className="tg-link"># Community Chat</span>
              <span className="tg-link"># Members Lounge</span>
            </div>
          </div>
        </div>

        {/* Checkmark confirmation */}
        <div className={`tg-msg tg-msg--bot ${visibleMessages >= 5 ? "tg-msg--visible" : ""}`}>
          <div className="tg-bubble tg-bubble--bot tg-bubble--success">
            Access granted to 3 channels. Your subscription renews automatically. Manage anytime with /account.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SVG Icons ─── */
function IconStripe() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconTerminal() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconSliders() {
  return (
    <svg className="feature-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

/* ─── Flow Diagram ─── */
function FlowDiagram() {
  return (
    <div className="flow-section">
      <div className="flow-row">
        <div className="flow-node">
          <span className="flow-num">01</span>
          <span className="flow-label">Subscribe in Telegram</span>
        </div>
        <div className="flow-arrow">
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <line x1="0" y1="6" x2="32" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="flow-node">
          <span className="flow-num">02</span>
          <span className="flow-label">Pay via Stripe</span>
        </div>
        <div className="flow-arrow">
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <line x1="0" y1="6" x2="32" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="flow-node">
          <span className="flow-num">03</span>
          <span className="flow-label">Get invite links</span>
        </div>
        <div className="flow-arrow">
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <line x1="0" y1="6" x2="32" y2="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="flow-node flow-node--highlight">
          <span className="flow-num">04</span>
          <span className="flow-label">Access granted</span>
        </div>
      </div>
      <div className="flow-divider">
        <span className="flow-divider-label">and when they leave...</span>
      </div>
      <div className="flow-row flow-row--removal">
        <div className="flow-node flow-node--danger">
          <span className="flow-label">Cancels or payment fails</span>
        </div>
        <div className="flow-arrow">
          <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
            <line x1="0" y1="6" x2="32" y2="6" stroke="rgba(255,100,100,0.4)" strokeWidth="1" />
            <polyline points="30,2 36,6 30,10" stroke="rgba(255,100,100,0.4)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="flow-node flow-node--danger">
          <span className="flow-label">Auto-removed from channels</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Comparison Table ─── */
function ComparisonTable() {
  const rows = [
    { feature: "Pricing", them: "Tiered by sales volume. The more you earn, the more you pay", us: "One flat fee at any scale" },
    { feature: "Your data", them: "Stored on their platform", us: "Your Stripe account, your data" },
    { feature: "Access control", them: "Managed by their system", us: "Stripe-verified. No ghost subscribers" },
    { feature: "Support", them: "Ticket system", us: "Direct from the developer" },
  ];

  return (
    <div className="compare-table">
      <div className="compare-header">
        <div className="compare-cell compare-cell--feature" />
        <div className="compare-cell compare-cell--them">InviteMember</div>
        <div className="compare-cell compare-cell--us">NorthStack Bot</div>
      </div>
      {rows.map((row) => (
        <div key={row.feature} className="compare-row">
          <div className="compare-cell compare-cell--feature">{row.feature}</div>
          <div className="compare-cell compare-cell--them">
            <svg className="compare-icon compare-icon--x" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="11" y2="11" /><line x1="11" y1="3" x2="3" y2="11" />
            </svg>
            <span>{row.them}</span>
          </div>
          <div className="compare-cell compare-cell--us">
            <svg className="compare-icon compare-icon--check" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="2 7 5.5 10.5 12 4" />
            </svg>
            <span>{row.us}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function TelegramBotPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [communityDetails, setCommunityDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 91;
      const y = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const faqs = [
    { q: "What do I need to get started?", a: "A Telegram bot token (from BotFather), a Stripe account, and your Telegram channel/group IDs. We\u2019ll walk you through all of it." },
    { q: "Do my payments go through you?", a: "No. Payments go directly to your Stripe account. We never touch your money. Stripe takes their standard processing fee (2.9% + 20p)." },
    { q: "How many channels can I connect?", a: "Up to 10 Telegram channels or groups per bot." },
    { q: "Can I change my plans or prices later?", a: "Yes. Plan names, prices, billing periods and discount codes can all be changed after launch. Tell us what you want and it's done, usually same day." },
    { q: "What if I want to cancel?", a: "Cancel anytime. Your members\u2019 Stripe subscriptions continue independently. You just lose the bot automation." },
    { q: "Do you support PayPal?", a: "Not yet. Stripe only for now. PayPal support is on the roadmap." },
  ];

  return (
    <>
      <Overlays />

      <Header mode="route" links={ROUTE_NAV} />

      {/* Hero — Split Layout */}
      <section className="product-hero">
        <div className="hero-atmosphere-glow" />
        <div className="hero-noise-overlay" />
        <div className="product-hero-inner">
          <div className="product-hero-text">
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontVariationSettings: "'SOFT' 50, 'WONK' 1",
                textAlign: "left",
              }}
            >
              <span>Automate your paid</span>
              <span>Telegram community.</span>
            </h1>
            <div className="product-hero-meta">
              <p className="product-hero-sub">
                They pay, they&apos;re in. They cancel, they&apos;re out. Nothing for you to check. £39.99 flat per month.
              </p>
              <a
                href="#enquiry"
                className="hero-btn-primary"
                onClick={(e) => { e.preventDefault(); scrollTo("#enquiry"); }}
              >
                GET STARTED →
              </a>
            </div>
          </div>
          <div className="product-hero-mockup">
            <TelegramMockup />
          </div>
        </div>
      </section>

      {/* How It Works — Flow Diagram */}
      <section id="how-it-works" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
        </div>
        <FlowDiagram />
      </section>

      {/* What's Included — 2x3 Feature Grid */}
      <section id="included" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">What&apos;s Included</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <IconStripe />
            <h3 className="feature-name">Stripe Payments</h3>
            <p className="feature-desc">Secure checkout, automatic renewals, failed payment handling. Your Stripe account, your revenue.</p>
          </div>
          <div className="feature-card">
            <IconShield />
            <h3 className="feature-name">Auto Access Control</h3>
            <p className="feature-desc">Single-use invite links. Automatic removal on cancellation. Zero freeloaders.</p>
          </div>
          <div className="feature-card">
            <IconTerminal />
            <h3 className="feature-name">Admin Tools</h3>
            <p className="feature-desc">Subscriber stats, revenue tracking, broadcast messaging, welcome editor. All from Telegram.</p>
          </div>
          <div className="feature-card">
            <IconServer />
            <h3 className="feature-name">Fully Managed</h3>
            <p className="feature-desc">We host, maintain, and update everything. You focus on your community.</p>
          </div>
          <div className="feature-card">
            <IconCalendar />
            <h3 className="feature-name">Flexible Plans</h3>
            <p className="feature-desc">Weekly, monthly, quarterly, yearly, or one-off passes with a fixed end date. Any price, any billing period. Discount codes supported through Stripe.</p>
          </div>
          <div className="feature-card">
            <IconSliders />
            <h3 className="feature-name">Made Yours</h3>
            <p className="feature-desc">Welcome message, plan names, descriptions, and channel setup all configured for your community. Edit your welcome text from inside Telegram with no downtime.</p>
          </div>
        </div>
      </section>

      {/* vs InviteMember */}
      <section id="compare" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">vs InviteMember</h2>
        </div>
        <ComparisonTable />
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-content">
          <h2
            className="pricing-headline"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontVariationSettings: "'SOFT' 50, 'WONK' 1",
            }}
          >
            £39.99/month
          </h2>
          <p className="pricing-subtext">
            No revenue caps. No per-subscriber fees. No setup costs.
          </p>
          <p className="pricing-note">
            Cancel anytime. Your members&apos; subscriptions continue independently.
          </p>
          <a
            href="#enquiry"
            className="hero-btn-primary"
            onClick={(e) => { e.preventDefault(); scrollTo("#enquiry"); }}
          >
            GET STARTED →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">FAQ</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button type="button" className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <span className="faq-toggle">{openFaq === i ? "\u2212" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="faq-answer"><p>{faq.a}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="contact-section">
        <h2 className="contact-heading">Get started</h2>
        {isSuccess ? (
          <div className="contact-form" style={{ textAlign: "center", paddingTop: 40, paddingBottom: 40 }}>
            <p className="mono" style={{ fontSize: 18, lineHeight: 1.6 }}>
              Thanks, {name}. We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            className="contact-form"
            onSubmit={async (e) => {
              e.preventDefault();
              if (isSubmitting) return;
              setIsSubmitting(true);
              setErrorMessage("");
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name,
                    email,
                    projectType: "Telegram Membership Bot",
                    projectDetails: `Telegram: ${telegram}\n\n${communityDetails}`,
                    productInterest: "telegram-bot",
                  }),
                });
                if (!res.ok) {
                  const data = await res.json();
                  throw new Error(data.error || "Something went wrong.");
                }
                setIsSuccess(true);
              } catch (err) {
                setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            <div className="contact-row">
              <div className="contact-field">
                <label className="contact-label">Name</label>
                <input type="text" className="contact-input" placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="contact-field">
                <label className="contact-label">Email</label>
                <input type="email" className="contact-input" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="contact-field">
              <label className="contact-label">Telegram username</label>
              <input type="text" className="contact-input" placeholder="@yourusername" required value={telegram} onChange={(e) => setTelegram(e.target.value)} />
            </div>
            <div className="contact-field">
              <label className="contact-label">Tell us about your community</label>
              <textarea className="contact-input contact-textarea" placeholder="What's your community about? How many members? Are you currently using another tool?" rows={4} required value={communityDetails} onChange={(e) => setCommunityDetails(e.target.value)} />
            </div>
            {errorMessage && (
              <p style={{ color: "#ff4444", fontSize: 14, marginTop: -8 }}>{errorMessage}</p>
            )}
            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? "SENDING..." : "GET STARTED →"}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
