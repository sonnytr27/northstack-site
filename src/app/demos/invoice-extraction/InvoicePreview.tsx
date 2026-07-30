import type { InvoiceSample } from "@/data/invoice-samples";
import { formatMoney } from "./format";

/**
 * The document shown on the left of the demo.
 *
 * SWAP SEAM — this component owns the entire visual of the document and nothing
 * else. The page only ever renders <InvoicePreview sample={...} /> and positions
 * the scan overlay around it. To drop in designed invoice artwork later, replace
 * the body of this component (an <img>, an inline <svg>, whatever the artwork
 * is) keeping the same props. The page, the timing, the extraction sequence and
 * the CSV export do not need to change.
 *
 * If artwork is per-sample, key off `sample.id` here — the page passes the whole
 * sample object for exactly that reason.
 */
export default function InvoicePreview({ sample }: { sample: InvoiceSample }) {
  return (
    <article className="ix-doc" aria-label={`Invoice from ${sample.supplier}`}>
      <header className="ix-doc-head">
        <h3 className="ix-doc-supplier">{sample.supplier}</h3>
        <span className="mono ix-doc-tag">Invoice</span>
      </header>

      <div className="ix-doc-meta">
        <div className="ix-doc-meta-item">
          <span className="mono">No.</span>
          <span className="ix-doc-meta-value">{sample.invoiceNumber}</span>
        </div>
        <div className="ix-doc-meta-item">
          <span className="mono">Date</span>
          <span className="ix-doc-meta-value">{sample.date}</span>
        </div>
      </div>

      <div className="ix-doc-rows">
        {sample.lineItems.map((item, i) => (
          <div key={i} className="ix-doc-row">
            <span className="ix-doc-row-desc">{item.description}</span>
            <span className="ix-doc-row-qty mono">
              {item.qty} × {formatMoney(item.unitPrice, sample.currency)}
            </span>
            <span className="ix-doc-row-amount">
              {formatMoney(item.qty * item.unitPrice, sample.currency)}
            </span>
          </div>
        ))}
      </div>

      <footer className="ix-doc-totals">
        <div className="ix-doc-total-row">
          <span className="mono">Subtotal</span>
          <span>{formatMoney(sample.subtotal, sample.currency)}</span>
        </div>
        <div className="ix-doc-total-row">
          <span className="mono">VAT 20%</span>
          <span>{formatMoney(sample.vat, sample.currency)}</span>
        </div>
        <div className="ix-doc-total-row ix-doc-total-row--grand">
          <span className="mono">Total due</span>
          <span>{formatMoney(sample.total, sample.currency)}</span>
        </div>
      </footer>
    </article>
  );
}
