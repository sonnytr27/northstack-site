import type { InvoiceSample } from "@/data/invoice-samples";
import { formatAmountPlain } from "./format";

/**
 * Real CSV generation and download. This part of the demo is genuinely
 * functional — the file that lands in the visitor's downloads folder is built
 * from the same object the page is displaying.
 */

/** RFC 4180: wrap in quotes when the cell contains a quote, comma or newline,
 *  and double any embedded quote. */
function escapeCell(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

function row(cells: string[]): string {
  return cells.map(escapeCell).join(",");
}

export function buildInvoiceCsv(sample: InvoiceSample): string {
  const lines: string[] = [
    row(["Supplier", sample.supplier]),
    row(["Invoice number", sample.invoiceNumber]),
    row(["Date", sample.date]),
    row(["Currency", sample.currencyCode]),
    "",
    row(["Description", "Quantity", "Unit price", "Line total"]),
    ...sample.lineItems.map((item) =>
      row([
        item.description,
        String(item.qty),
        formatAmountPlain(item.unitPrice),
        formatAmountPlain(item.qty * item.unitPrice),
      ])
    ),
    "",
    row(["Subtotal", "", "", formatAmountPlain(sample.subtotal)]),
    row(["VAT (20%)", "", "", formatAmountPlain(sample.vat)]),
    row(["Total", "", "", formatAmountPlain(sample.total)]),
  ];

  // CRLF per RFC 4180 — keeps older spreadsheet software happy.
  return lines.join("\r\n") + "\r\n";
}

/** Strip anything that would be awkward in a filename across platforms. */
function safeFilename(invoiceNumber: string): string {
  const cleaned = invoiceNumber.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "");
  return `${cleaned || "invoice"}.csv`;
}

export function downloadInvoiceCsv(sample: InvoiceSample): void {
  const blob = new Blob([buildInvoiceCsv(sample)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = safeFilename(sample.invoiceNumber);
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Revoke on the next task so the download has taken hold of the blob first.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
