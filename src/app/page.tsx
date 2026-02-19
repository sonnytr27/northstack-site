"use client";

import { useEffect, useRef, useState } from "react";

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
  const scratchRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState("");
  const [budget, setBudget] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = scratchRef.current;
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const scratch = document.createElement("div");
      scratch.classList.add("scratch");

      const width = Math.random() * 200 + 50;
      const height = Math.random() * 1 + 0.5;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const rotation = Math.random() * 360;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;

      scratch.style.width = `${width}px`;
      scratch.style.height = `${height}px`;
      scratch.style.top = `${top}%`;
      scratch.style.left = `${left}%`;
      scratch.style.transform = `rotate(${rotation}deg)`;
      scratch.style.animationDelay = `${delay}s`;
      scratch.style.animationDuration = `${duration}s`;

      container.appendChild(scratch);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

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
      {/* Overlays */}
      <div className="noise-layer" />
      <div className="scanline" />
      <div className="scratch-layer" ref={scratchRef} />

      {/* Header */}
      <header className="ns-header">
        <a
          href="#"
          className="ns-logo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src="/logo.png"
            alt=""
            className="h-[16px] w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          NORTHSTACK
        </a>
        <nav className="ns-nav">
          {[
            { label: "SERVICES", href: "#services" },
            { label: "PROCESS", href: "#process" },
            { label: "START A PROJECT", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="ns-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            type="button"
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {[
            { label: "SERVICES", href: "#services" },
            { label: "PROCESS", href: "#process" },
            { label: "START A PROJECT", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-menu-link"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollTo(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Hero */}
      <section className="ns-hero">
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
              <p style={{ color: "rgba(255, 255, 255, 0.6)", fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', Consolas, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.8, maxWidth: 600, marginBottom: 50 }}>
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
          <h2 className="section-title">Services</h2>
        </div>
        <div className="services-grid">
          {[
            {
              num: "001",
              name: "Web Applications",
              desc: "Custom platforms and dashboards that run your business better - built around how your team actually works.",
            },
            {
              num: "002",
              name: "Mobile Platforms",
              desc: "Apps people want to open twice. iOS, Android, or both - from clean MVP to full-scale product.",
            },
            {
              num: "003",
              name: "SaaS & Tooling",
              desc: "Subscription platforms, marketplaces, and multi-user systems. Complex architecture, clean execution.",
            },
            {
              num: "004",
              name: "Automation & Tooling",
              desc: "Bots, scrapers, data pipelines, internal dashboards - if it runs on code, we can build it.",
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
          <h2 className="section-title">The Process</h2>
        </div>
        <div className="services-grid">
          {[
            {
              num: "001",
              name: "Discovery",
              desc: "We learn exactly how your business works, then define the core problem and map out the most efficient technical path.",
            },
            {
              num: "002",
              name: "Design",
              desc: "High-fidelity UI/UX that aligns with your brand and user expectations.",
            },
            {
              num: "003",
              name: "Build",
              desc: "Clean, modular code built to scale. Test-driven development with regular deliverables so nothing gets lost in translation.",
            },
            {
              num: "004",
              name: "Launch",
              desc: "Deployment to production, performance monitoring, and ongoing support. We don't disappear after go-live.",
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
                { value: "£0 – £1,000", label: "£0 – £1,000" },
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
      <footer className="ns-footer">
        <div className="ns-logo">
          <img
            src="/logo.png"
            alt=""
            className="h-[14px] w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          NORTHSTACK
        </div>
        <div className="footer-credit mono">
          © 2026 NORTHSTACK LTD. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </>
  );
}
