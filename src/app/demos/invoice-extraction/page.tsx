"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import { ROUTE_NAV } from "@/data/nav";
import {
  genericSample,
  invoiceSamples,
  type InvoiceSample,
} from "@/data/invoice-samples";
import InvoicePreview from "./InvoicePreview";
import { downloadInvoiceCsv } from "./csv";
import { formatMoney } from "./format";
import "./invoice.css";

/* ─── Timing ───
 * The number printed on screen is derived from these constants, so the claim
 * can never drift from what the visitor actually watched. Reading takes
 * READ_MS, then STEP_COUNT fields land STAGGER_MS apart:
 *   800 + (7 × 90) = 1430ms → "1.4s"
 */
const READ_MS = 800;
const STAGGER_MS = 90;
const STEP_COUNT = 7;
const TOTAL_MS = READ_MS + STEP_COUNT * STAGGER_MS;
const ELAPSED_LABEL = `${(TOTAL_MS / 1000).toFixed(1)}s`;

/** Reveal order. Index into these when deciding whether a row is visible. */
const STEP = {
  supplier: 0,
  invoiceNumber: 1,
  date: 2,
  lineItems: 3,
  subtotal: 4,
  vat: 5,
  total: 6,
} as const;

const FRAUNCES = {
  fontFamily: "'Fraunces', serif",
  fontWeight: 900,
  fontStyle: "italic" as const,
  fontVariationSettings: "'SOFT' 50, 'WONK' 1",
};

/** Delivery shapes shown beneath the tool. Same card pattern as the homepage
 *  services grid, so it reads as native. */
const DELIVERY_SHAPES = [
  {
    num: "001",
    name: "A tool your team uses",
    desc: "Your staff drop documents in and get clean rows out, the same way the demo works, but reading your real files and behind your own login. For when documents arrive steadily and someone needs to handle them as they come.",
  },
  {
    num: "002",
    name: "An automation that runs itself",
    desc: "Documents land in an inbox or a folder, and the rows appear in your spreadsheet on their own. Nobody clicks anything. For when you'd rather the job just disappeared.",
  },
  {
    num: "003",
    name: "A one-off clear-out",
    desc: "Hand over the backlog, a folder of hundreds of old documents, and get back a single clean spreadsheet. No software to run. For when the pile has already built up and you just need it dealt with.",
  },
];

/** Card titles render in mono uppercase, which breaks hyphenated words
 *  mid-word at a narrow column ("CLEAR-" / "OUT"). Wrapping each hyphenated
 *  token keeps it whole while the rest of the title still wraps normally. */
function keepHyphensIntact(title: string) {
  return title.split(/(\s+)/).map((token, i) =>
    token.includes("-") ? (
      <span key={i} className="ix-keep">
        {token}
      </span>
    ) : (
      token
    )
  );
}

type Phase = "idle" | "reading" | "extracting" | "done";

/** A selection. `seq` increments on every pick so choosing the same sample
 *  twice is a new object and re-runs the effect. */
type Run = { sample: InvoiceSample; seq: number; droppedName: string | null };

export default function InvoiceExtractionPage() {
  const [run, setRun] = useState<Run | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!run) return;

    // The reading/reset state is set by `select` below; this effect only
    // schedules the forward transitions.
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase("extracting"), READ_MS),
      ...Array.from({ length: STEP_COUNT }, (_, i) =>
        setTimeout(() => setRevealed(i + 1), READ_MS + i * STAGGER_MS)
      ),
      setTimeout(() => setPhase("done"), TOTAL_MS),
    ];

    // Selecting another sample mid-run cancels this one outright rather than
    // letting two sequences interleave.
    return () => timers.forEach(clearTimeout);
  }, [run]);

  const select = (sample: InvoiceSample, droppedName: string | null = null) => {
    setPhase("reading");
    setRevealed(0);
    setRun((prev) => ({ sample, droppedName, seq: (prev?.seq ?? 0) + 1 }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // The dropped file is never opened, parsed or sent anywhere. Only its name
    // is read, purely so the page can say what it received.
    const name = e.dataTransfer.files?.[0]?.name ?? null;
    select(genericSample, name);
  };

  const sample = run?.sample ?? null;
  const isDone = phase === "done";
  const shown = (step: number) => revealed > step;

  return (
    <>
      <Overlays />

      <Header mode="route" links={ROUTE_NAV} />

      {/* 1. Hero */}
      <section className="work-hero">
        <div className="ns-container">
          <div className="work-hero-inner">
            <span className="mono ix-eyebrow">DEMO · DOCUMENT EXTRACTION</span>
            <h1 className="work-hero-title">Turn documents into data.</h1>
            <span className="mono ix-hero-sub">
              Drop in an invoice. Get structured rows out. No typing.
            </span>
          </div>
        </div>
      </section>

      {/* 2. The tool */}
      <section className="ns-container ix-section">
        <div className="grid-lines" />
        <div className="ix-grid">
          {/* Left — document */}
          <div className="ix-col">
            <span className="mono ix-col-label">Document</span>

            <div
              className={[
                "ix-drop",
                sample ? "" : "ix-drop--empty",
                dragOver ? "ix-drop--over" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {sample ? (
                <>
                  <InvoicePreview sample={sample} />
                  {phase === "reading" && (
                    <div
                      key={run?.seq}
                      className="ix-scan"
                      style={{ animationDuration: `${READ_MS}ms` }}
                    />
                  )}
                </>
              ) : (
                <div className="ix-drop-prompt">
                  <span className="mono">Drop an invoice here</span>
                  <span className="mono ix-drop-prompt-alt">
                    or pick a sample below
                  </span>
                </div>
              )}
            </div>

            {run?.droppedName && (
              <p className="mono ix-drop-note">
                Received {run.droppedName}. Demo uses prepared samples, your
                file was not read.
              </p>
            )}

            <span className="mono ix-thumbs-cue">Try one →</span>

            <div className="ix-thumbs">
              {invoiceSamples.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`ix-thumb ${
                    sample?.id === item.id ? "ix-thumb--active" : ""
                  }`}
                  onClick={() => select(item)}
                  aria-pressed={sample?.id === item.id}
                >
                  <span className="ix-thumb-lines" aria-hidden="true">
                    <span /><span /><span /><span />
                  </span>
                  <span className="ix-thumb-name">{item.supplier}</span>
                  <span className="mono ix-thumb-ref">{item.invoiceNumber}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — extracted fields */}
          <div className="ix-col">
            <span className="mono ix-col-label">
              Extracted
              {phase === "reading" && <span className="ix-status"> · Reading…</span>}
            </span>

            <div className="ix-fields">
              {!sample && (
                <div className="ix-ghost">
                  <div className="ix-ghost-structure" aria-hidden="true">
                    {[62, 44, 38].map((width) => (
                      <div key={width} className="ix-ghost-row">
                        <span className="ix-ghost-bar ix-ghost-bar--label" />
                        <span
                          className="ix-ghost-bar ix-ghost-bar--value"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    ))}

                    <div className="ix-ghost-table">
                      <div className="ix-ghost-table-row ix-ghost-table-row--head">
                        <span className="ix-ghost-bar" />
                        <span className="ix-ghost-bar" />
                        <span className="ix-ghost-bar" />
                        <span className="ix-ghost-bar" />
                      </div>
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="ix-ghost-table-row">
                          <span className="ix-ghost-bar" />
                          <span className="ix-ghost-bar" />
                          <span className="ix-ghost-bar" />
                          <span className="ix-ghost-bar" />
                        </div>
                      ))}
                    </div>

                    <div className="ix-ghost-row">
                      <span className="ix-ghost-bar ix-ghost-bar--label" />
                      <span className="ix-ghost-bar" style={{ width: "22%" }} />
                    </div>
                    <div className="ix-ghost-row">
                      <span className="ix-ghost-bar ix-ghost-bar--label" />
                      <span className="ix-ghost-bar" style={{ width: "18%" }} />
                    </div>
                    <div className="ix-ghost-row ix-ghost-row--total">
                      <span className="ix-ghost-bar ix-ghost-bar--label" />
                      <span className="ix-ghost-bar ix-ghost-bar--total" />
                    </div>
                  </div>

                  <span className="mono ix-ghost-label">
                    Select a document to extract
                  </span>
                </div>
              )}

              {sample && (
                <>
                  <div className={`ix-field ${shown(STEP.supplier) ? "ix-field--in" : ""}`}>
                    <span className="mono">Supplier</span>
                    <span className="ix-field-value">{sample.supplier}</span>
                  </div>

                  <div className={`ix-field ${shown(STEP.invoiceNumber) ? "ix-field--in" : ""}`}>
                    <span className="mono">Invoice number</span>
                    <span className="ix-field-value">{sample.invoiceNumber}</span>
                  </div>

                  <div className={`ix-field ${shown(STEP.date) ? "ix-field--in" : ""}`}>
                    <span className="mono">Date</span>
                    <span className="ix-field-value">{sample.date}</span>
                  </div>

                  <div className={`ix-items ${shown(STEP.lineItems) ? "ix-items--in" : ""}`}>
                    <div className="ix-items-head">
                      <span className="mono">Item</span>
                      <span className="mono">Qty</span>
                      <span className="mono">Unit</span>
                      <span className="mono">Amount</span>
                    </div>
                    {sample.lineItems.map((item, i) => (
                      <div key={i} className="ix-items-row">
                        <span className="ix-items-desc">{item.description}</span>
                        <span className="ix-items-num">{item.qty}</span>
                        <span className="ix-items-num">
                          {formatMoney(item.unitPrice, sample.currency)}
                        </span>
                        <span className="ix-items-num">
                          {formatMoney(item.qty * item.unitPrice, sample.currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`ix-field ${shown(STEP.subtotal) ? "ix-field--in" : ""}`}>
                    <span className="mono">Subtotal</span>
                    <span className="ix-field-value">
                      {formatMoney(sample.subtotal, sample.currency)}
                    </span>
                  </div>

                  <div className={`ix-field ${shown(STEP.vat) ? "ix-field--in" : ""}`}>
                    <span className="mono">VAT 20%</span>
                    <span className="ix-field-value">
                      {formatMoney(sample.vat, sample.currency)}
                    </span>
                  </div>

                  <div
                    className={`ix-field ix-field--total ${
                      shown(STEP.total) ? "ix-field--in" : ""
                    }`}
                  >
                    <span className="mono">Total</span>
                    <span className="ix-total-value" style={FRAUNCES}>
                      {formatMoney(sample.total, sample.currency)}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="ix-actions">
              <span className={`mono ix-timing ${isDone ? "ix-timing--in" : ""}`}>
                Extracted in {ELAPSED_LABEL}
              </span>
              <button
                type="button"
                className="hero-btn-primary ix-export"
                onClick={() => sample && downloadInvoiceCsv(sample)}
                disabled={!isDone || !sample}
              >
                EXPORT TO CSV ↓
              </button>
            </div>

            <p className="ix-aside">
              That took under two seconds. By hand, about three minutes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. What this looks like for your business */}
      <section className="ns-container ix-shapes">
        <div className="grid-lines" />
        <div className="section-header">
          <h2 className="section-title">What this looks like for your business</h2>
        </div>
        <p className="ix-shapes-intro">
          The demo above is the capability. How it&apos;s delivered depends on
          what you need. Three common shapes:
        </p>
        <div className="ix-shapes-grid">
          {DELIVERY_SHAPES.map((shape) => (
            <div key={shape.num} className="service-card">
              <div>
                <div className="mono" style={{ marginBottom: 20 }}>
                  {shape.num}
                </div>
                <h3 className="service-name">
                  {keepHyphensIntact(shape.name)}
                </h3>
                <p className="service-desc">{shape.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="ix-shapes-close">
          If someone in your business retypes invoices, receipts, or delivery
          notes into a spreadsheet, any of these removes that job.
        </p>
      </section>

      {/* 4. Outro */}
      <section className="ns-container ix-outro">
        <div className="grid-lines" />
        <Link href="/work" className="mono work-back">
          ← BACK TO WORK
        </Link>
        <p className="ix-disclosure">
          Scripted demonstration. Deterministic results, no model call.
        </p>
      </section>

      <Footer />
    </>
  );
}
