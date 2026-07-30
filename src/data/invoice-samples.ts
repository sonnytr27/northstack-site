/**
 * Pre-defined results for the /demos/invoice-extraction demonstration.
 *
 * Nothing here is read from a document at runtime. The demo is scripted:
 * selecting a sample replays a fixed animation and displays the object below.
 * The businesses are fictional and the arithmetic is checked — subtotal is the
 * sum of the line totals, VAT is 20% of subtotal, total is the sum of both.
 */

export type LineItem = {
  description: string;
  qty: number;
  unitPrice: number;
};

export type InvoiceSample = {
  id: string;
  /** Short label for the selector card. */
  shortName: string;
  supplier: string;
  invoiceNumber: string;
  date: string;
  currency: string;
  currencyCode: string;
  lineItems: LineItem[];
  subtotal: number;
  vat: number;
  total: number;
};

export const invoiceSamples: InvoiceSample[] = [
  {
    id: "meridian",
    shortName: "Meridian",
    supplier: "Meridian Office Supplies",
    invoiceNumber: "MOS-4471",
    date: "14 May 2026",
    currency: "£",
    currencyCode: "GBP",
    lineItems: [
      { description: "A4 copier paper, 80gsm (box of 5 reams)", qty: 12, unitPrice: 18.4 },
      { description: "Ballpoint pens, black (pack of 50)", qty: 6, unitPrice: 9.75 },
      { description: "Desk organiser, steel mesh", qty: 4, unitPrice: 22.5 },
      { description: "Toner cartridge, mono", qty: 3, unitPrice: 64.0 },
    ],
    subtotal: 561.3,
    vat: 112.26,
    total: 673.56,
  },
  {
    id: "northgate",
    shortName: "Northgate",
    supplier: "Northgate Logistics",
    invoiceNumber: "NGL-2026-0883",
    date: "2 June 2026",
    currency: "£",
    currencyCode: "GBP",
    lineItems: [
      { description: "Pallet delivery, zone 2", qty: 18, unitPrice: 34.0 },
      { description: "Overnight courier, pre-10am", qty: 7, unitPrice: 21.5 },
      { description: "Warehouse handling fee", qty: 1, unitPrice: 145.0 },
    ],
    subtotal: 907.5,
    vat: 181.5,
    total: 1089.0,
  },
  {
    id: "calder",
    shortName: "Calder & Vane",
    supplier: "Calder & Vane Print Co.",
    invoiceNumber: "CVP-19204",
    date: "21 June 2026",
    currency: "£",
    currencyCode: "GBP",
    lineItems: [
      { description: "Business cards, 450gsm matt (per 500)", qty: 8, unitPrice: 29.0 },
      { description: "Exhibition banner, roll-up 850mm", qty: 2, unitPrice: 118.0 },
      { description: "Brochure, A5 16pp (per 250)", qty: 3, unitPrice: 187.5 },
      { description: 'Vinyl window decal, cut to shape', qty: 5, unitPrice: 41.2 },
    ],
    subtotal: 1236.5,
    vat: 247.3,
    total: 1483.8,
  },
];

export function getSample(id: string): InvoiceSample | undefined {
  return invoiceSamples.find((sample) => sample.id === id);
}
