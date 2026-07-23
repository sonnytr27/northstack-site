import type { Metadata } from "next";
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
          {work.map((entry) => (
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
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
