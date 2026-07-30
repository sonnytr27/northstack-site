import Link from "next/link";

export default function Footer() {
  return (
    <footer className="ns-footer">
      <span className="footer-credit">© 2026 NorthStack</span>
      <div className="ns-logo">
        <img
          src="/logo.png"
          alt=""
          className="h-[14px] w-auto"
          style={{ mixBlendMode: "screen" }}
        />
        NORTHSTACK
      </div>
      <div className="footer-links">
        <Link href="/privacy" className="footer-link">
          Privacy
        </Link>
        <a href="mailto:northstackcc@gmail.com" className="footer-email">
          northstackcc@gmail.com
        </a>
      </div>
    </footer>
  );
}
