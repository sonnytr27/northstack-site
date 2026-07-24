import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ROUTE_NAV } from "@/data/nav";
import { work, getWork } from "@/data/work";

export function generateStaticParams() {
  return work.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — NorthStack`,
    description: entry.summary,
  };
}

const FRAUNCES = {
  fontFamily: "'Fraunces', serif",
  fontWeight: 900,
  fontStyle: "italic" as const,
  fontVariationSettings: "'SOFT' 50, 'WONK' 1",
};

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) notFound();

  const { sections } = entry;

  return (
    <>
      <Overlays />

      <Header mode="route" links={ROUTE_NAV} />

      {/* 1. Hero */}
      <section className="work-hero">
        <div className="ns-container">
          <div className="work-hero-inner">
            <span className="mono work-hero-eyebrow">
              <span className="work-hero-eyebrow-cat">
                {entry.number} · {entry.category}
              </span>
              <span className="work-hero-eyebrow-stack">- {entry.stack}</span>
            </span>
            <h1 className="work-hero-title">{entry.title}</h1>
            <span className="mono work-hero-date">{entry.dateRange}</span>
          </div>
        </div>
      </section>

      {/* 2. The problem */}
      <section className="ns-container work-section">
        <div className="grid-lines" />
        <h2 className="product-feature-title">The problem</h2>
        <div className="work-prose">
          {sections.problem.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 3. What we built */}
      <section className="ns-container work-section">
        <div className="grid-lines" />
        <h2 className="product-feature-title">What we built</h2>
        <div className="work-prose">
          {sections.built.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 4. Deep dive */}
      <section className="ns-container work-section">
        <div className="grid-lines" />
        <h2 className="product-feature-title">{sections.deepDive.heading}</h2>
        <div className="work-prose">
          {sections.deepDive.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 5. By the numbers */}
      <section className="ns-container work-section work-section--flush-bottom">
        <div className="grid-lines" />
        <h2 className="product-feature-title">By the numbers</h2>
        <div className="work-numbers">
          {sections.numbers.map((stat, i) => (
            <div key={i} className="work-number">
              <div className="work-number-value" style={FRAUNCES}>
                {stat.value}
              </div>
              <span className="mono work-number-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Back to work + contact CTA */}
      <section className="ns-container work-outro">
        <div className="grid-lines" />
        <Link href="/work" className="mono work-back">
          ← BACK TO WORK
        </Link>
      </section>

      <section className="contact-section">
        <h2 className="contact-heading">Start a project</h2>
        <div className="work-cta-actions">
          <Link href="/#contact" className="hero-btn-primary">
            START A PROJECT →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
