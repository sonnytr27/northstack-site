import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthStack | Digital Product Studio",
  description:
    "We design and build premium apps, platforms, and digital products for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
