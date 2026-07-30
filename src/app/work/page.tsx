import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ROUTE_NAV } from "@/data/nav";
import { work } from "@/data/work";

export const metadata: Metadata = {
  title: "Selected Work — NorthStack",
  description:
    "Selected work from NorthStack — custom software, platforms, and automation built around how each business actually operates.",
};

export default function WorkIndexPage() {
  return (
    <>
      <Overlays />

      <Header mode="route" links={ROUTE_NAV} />

      <section className="ns-container work-index">
        <div className="grid-lines" />
        <div className="section-header">
          <h1 className="section-title">Selected Work</h1>
        </div>

        <div className="work-list">
          {work.map((entry) =>
            entry.isDemo ? (
              /* Demo card. The whole card still leads to the detail page, but a
                 nested anchor inside an anchor is invalid, so the card is a div
                 and the card-wide click target is an overlay link sitting under
                 the demo CTA. */
              <div key={entry.slug} className="work-row work-row--demo">
                <Link
                  href={`/work/${entry.slug}`}
                  className="work-row-overlay"
                  aria-label={`Read the build: ${entry.title}`}
                />
                <span className="mono work-row-eyebrow">
                  {entry.number} · {entry.category}
                  <span className="work-tag">Demo</span>
                </span>
                <h2 className="work-row-title">{entry.title}</h2>
                <p className="work-row-summary">{entry.summary}</p>

                <Link href={entry.demoUrl} className="mono work-row-demo-cta">
                  TRY IT LIVE →
                </Link>

                <span className="mono work-row-cta">READ THE BUILD →</span>
              </div>
            ) : (
              <a
                key={entry.slug}
                href={`/work/${entry.slug}`}
                className="work-row"
              >
                <span className="mono work-row-eyebrow">
                  {entry.number} · {entry.category}
                </span>
                <h2 className="work-row-title">{entry.title}</h2>
                <p className="work-row-summary">{entry.summary}</p>

                <div className="work-row-stats">
                  {entry.cardStats.map((stat, i) => (
                    <div key={i} className="work-stat">
                      <div
                        className="work-stat-value"
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontWeight: 900,
                          fontStyle: "italic",
                          fontVariationSettings: "'SOFT' 50, 'WONK' 1",
                        }}
                      >
                        {stat.value}
                      </div>
                      <span className="mono work-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <span className="mono work-row-cta">READ THE BUILD →</span>
              </a>
            ),
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
