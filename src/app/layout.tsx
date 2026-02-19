import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NorthStack | Digital Product Studio",
  description:
    "We design and build premium apps, platforms, and digital products for growing businesses.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
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
