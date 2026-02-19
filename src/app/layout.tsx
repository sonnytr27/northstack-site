import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthStack — We Build The Future",
  description:
    "NorthStack — we build the future. Custom software built around how your business actually works. Web apps, mobile platforms, SaaS, and automation tools.",
  openGraph: {
    title: "NorthStack — We Build The Future",
    description:
      "Custom software built around how your business actually works. Web apps, mobile platforms, SaaS, and automation tools.",
    images: [{ url: "/northstackblackbglogo.png", width: 1080, height: 1080 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "NorthStack — We Build The Future",
    description:
      "Custom software built around how your business actually works. Web apps, mobile platforms, SaaS, and automation tools.",
    images: ["/northstackblackbglogo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
