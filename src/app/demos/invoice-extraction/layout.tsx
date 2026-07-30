import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice extraction — NorthStack",
  description:
    "A demonstration of document extraction: drop in an invoice, watch structured fields come out, export them as CSV. Scripted, deterministic, no model call.",
};

export default function InvoiceExtractionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
