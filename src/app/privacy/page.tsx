import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ROUTE_NAV } from "@/data/nav";

export const metadata: Metadata = {
  title: "Privacy Policy — NorthStack",
  description:
    "What personal data NorthStack collects through this site, why we collect it, and how to have it corrected or deleted.",
};

const EMAIL = "northstackcc@gmail.com";

const LAST_UPDATED = "30 July 2026";

function Email() {
  return (
    <a href={`mailto:${EMAIL}`} className="privacy-link">
      {EMAIL}
    </a>
  );
}

/** Labelled prose sections, rendered in order. Labels set in mono caps. */
const SECTIONS: { label: string; body: ReactNode[] }[] = [
  {
    label: "What we collect",
    body: [
      "When you use the contact form on this site, we collect the name, email address, and any other information you choose to include in your message. We do not use tracking cookies or analytics that identify you personally.",
    ],
  },
  {
    label: "Why we collect it",
    body: [
      "We use this information only to respond to your enquiry and to discuss potential work. We do not use it for marketing, and we do not sell or share it with third parties.",
    ],
  },
  {
    label: "Legal basis",
    body: [
      "We process this data on the basis of legitimate interest: responding to an enquiry you have chosen to send us.",
    ],
  },
  {
    label: "How long we keep it",
    body: [
      "We keep enquiry data only as long as needed to deal with your enquiry and any resulting work. If no work follows, we delete it within a reasonable period.",
    ],
  },
  {
    label: "Your rights",
    body: [
      <>
        You can ask us what data we hold about you, ask us to correct it, or ask
        us to delete it, at any time. Email <Email /> and we will action it.
      </>,
    ],
  },
  {
    label: "Contact",
    body: [
      <>
        For any privacy question, email <Email />.
      </>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Overlays />

      <Header mode="route" links={ROUTE_NAV} />

      {/* Hero — same band as the work detail pages, so the page seats itself
          under the fixed header identically. */}
      <section className="work-hero">
        <div className="ns-container">
          <div className="work-hero-inner">
            <span className="mono work-hero-eyebrow">Legal</span>
            <h1 className="work-hero-title">Privacy Policy</h1>
            <span className="mono work-hero-date">
              Last updated: {LAST_UPDATED}
            </span>
          </div>
        </div>
      </section>

      {/* Preamble — no label of its own, it introduces the sections below. */}
      <section className="ns-container work-section">
        <div className="grid-lines" />
        <div className="work-prose">
          <p>
            NorthStack (&ldquo;we&rdquo;) is a sole trader business based in the
            United Kingdom. This policy explains what personal data we collect
            and how we handle it.
          </p>
        </div>
      </section>

      {SECTIONS.map((section, i) => (
        <section
          key={section.label}
          className={`ns-container work-section${
            i === SECTIONS.length - 1 ? " privacy-section--last" : ""
          }`}
        >
          <div className="grid-lines" />
          <h2 className="mono privacy-label">{section.label}</h2>
          <div className="work-prose">
            {section.body.map((para, j) => (
              <p key={j}>{para}</p>
            ))}
          </div>
        </section>
      ))}

      <Footer />
    </>
  );
}
