"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { SCROLL_NAV } from "@/data/nav";

function Dropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: React.ReactNode;
  placeholder: string;
  options: { value: string; label: string }[];
  value?: string | null;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value !== undefined ? value : internalSelected;

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  return (
    <div className="contact-field">
      <span className="contact-label">{label}</span>
      <div className="custom-dropdown" ref={ref}>
        <button
          type="button"
          className={`custom-dropdown-trigger ${selected ? "" : "custom-dropdown-trigger--placeholder"}`}
          onClick={() => setOpen(!open)}
        >
          <span>{selectedLabel || placeholder}</span>
          <span className="custom-dropdown-chevron">▼</span>
        </button>
        {open && (
          <div className="custom-dropdown-list">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`custom-dropdown-option ${selected === option.value ? "custom-dropdown-option--active" : ""}`}
                onClick={() => {
                  setInternalSelected(option.value);
                  onChange?.(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState("");
  const [budget, setBudget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 91;
      const y = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Overlays />

      <Header mode="scroll" links={SCROLL_NAV} />

      {/* Hero */}
      <section className="ns-hero">
        <div className="hero-atmosphere-glow" />
        <div className="hero-noise-overlay" />
        <div className="ns-container">
          <div className="hero-content">
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 900,
                fontStyle: "italic",
                fontVariationSettings: "'SOFT' 50, 'WONK' 1",
              }}
            >
              <span>Your vision, built</span>
              <span>and shipped.</span>
            </h1>
            <div className="hero-meta">
              <p style={{ color: "rgba(255, 255, 255, 0.6)", fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, monospace", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.8, maxWidth: 600, marginBottom: 50 }}>
                Software built around how your business actually works.
              </p>
              <a
                href="#contact"
                className="hero-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#contact");
                }}
              >
                START A PROJECT →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">What We Build</h2>
        </div>
        <div className="services-grid">
          {[
            {
              num: "001",
              name: "Web Applications",
              desc: "Platforms and dashboards built around how your team actually works. Not templates. Real software that replaces the bloated SaaS you're overpaying for.",
            },
            {
              num: "002",
              name: "Mobile Platforms",
              desc: "iOS, Android, or both - from first prototype to full-scale product. Designed to feel native, built to perform, and ready for the App Store.",
            },
            {
              num: "003",
              name: "SaaS & Tooling",
              desc: "Subscription platforms, marketplaces, and multi-user systems. Complex architecture, clean experience, without the enterprise price tag.",
            },
            {
              num: "004",
              name: "Automation & Internal Tools",
              desc: "Bots, scrapers, data pipelines, internal dashboards. The invisible tools that save your team hours every week. Built fast.",
            },
          ].map((service) => (
            <div key={service.num} className="service-card">
              <div>
                <div className="mono" style={{ marginBottom: 20 }}>
                  {service.num}
                </div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Process */}
      <section id="process" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
        </div>
        <div className="services-grid">
          {[
            {
              num: "001",
              name: "Discovery",
              desc: "We learn how your business actually runs, not just what you think you need. Core problem defined, technical path mapped, properly scoped before a line of code is written.",
            },
            {
              num: "002",
              name: "Design",
              desc: "High-fidelity UI/UX built around your brand and your users. You see exactly what you're getting before we build anything.",
            },
            {
              num: "003",
              name: "Build",
              desc: "Fast, focused development with deliverables every week. You see progress constantly and can course-correct in real time.",
            },
            {
              num: "004",
              name: "Launch",
              desc: "Live deployment, performance monitoring, and ongoing iteration. The product ships, then it evolves.",
            },
          ].map((step) => (
            <div key={step.num} className="service-card">
              <div>
                <div className="mono" style={{ marginBottom: 20 }}>
                  {step.num}
                </div>
                <h3 className="service-name">{step.name}</h3>
                <p className="service-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="ns-container">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">Products</h2>
        </div>
        <a href="/products/telegram-bot" className="product-feature-card">
          <div className="product-feature-glow" />
          <div className="product-feature-content">
            <div className="product-feature-left">
              <span className="mono" style={{ marginBottom: 16, display: "block" }}>PRODUCT</span>
              <h3 className="product-feature-title">Telegram Membership Bot</h3>
              <p className="product-feature-desc">
                Automate Stripe payments and access control for your paid Telegram community. No revenue caps, no freeloaders. £39.99/month.
              </p>
              <span className="product-feature-link">LEARN MORE →</span>
            </div>
            <div className="product-feature-visual">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l4.7 1.567 1.567 4.7a2.25 2.25 0 0 0 4.073.126l7.5-16.5a2.25 2.25 0 0 0-1.444-1.681z" />
              </svg>
              <div className="product-feature-mini-chat">
                <div className="mini-bubble mini-bubble--bot">/start</div>
                <div className="mini-bubble mini-bubble--reply">Choose your plan:</div>
                <div className="mini-bubble mini-bubble--success">Access granted</div>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <h2 className="contact-heading">Start a project</h2>
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
                  body: JSON.stringify({ name, email, company, projectType, projectDetails, budget }),
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
                <input type="email" className="contact-input" placeholder="you@company.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="contact-field">
              <label className="contact-label">Company <span style={{ opacity: 0.5 }}>(optional)</span></label>
              <input type="text" className="contact-input" placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <Dropdown
              label="What do you need?"
              placeholder="Select a service"
              value={projectType}
              onChange={setProjectType}
              options={[
                { value: "Web Application", label: "Web Application" },
                { value: "Mobile App", label: "Mobile App" },
                { value: "SaaS Platform", label: "SaaS Platform" },
                { value: "Automation / Tooling", label: "Automation / Tooling" },
                { value: "Something else", label: "Something else" },
              ]}
            />
            <div className="contact-field">
              <label className="contact-label">Project details</label>
              <textarea className="contact-input contact-textarea" placeholder="Tell us about your project, timeline, and any specific requirements..." rows={4} required value={projectDetails} onChange={(e) => setProjectDetails(e.target.value)} />
            </div>
            <Dropdown
              label="Budget range"
              placeholder="Select a range"
              value={budget}
              onChange={setBudget}
              options={[
                { value: "£0 - £1k", label: "£0 - £1k" },
                { value: "£1k – £5k", label: "£1k – £5k" },
                { value: "£5k – £15k", label: "£5k – £15k" },
                { value: "£15k – £30k", label: "£15k – £30k" },
                { value: "£30k+", label: "£30k+" },
                { value: "Not sure yet", label: "Not sure yet" },
              ]}
            />
            {errorMessage && (
              <p style={{ color: "#ff4444", fontSize: 14, marginTop: -8 }}>{errorMessage}</p>
            )}
            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? "SENDING..." : "SEND ENQUIRY →"}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
