export default function Footer() {
  return (
    <footer className="ns-footer">
      <span className="footer-credit">© 2026 NorthStack Ltd.</span>
      <div className="ns-logo">
        <img
          src="/logo.png"
          alt=""
          className="h-[14px] w-auto"
          style={{ mixBlendMode: "screen" }}
        />
        NORTHSTACK
      </div>
      <a href="mailto:northstackcc@gmail.com" className="footer-email">
        northstackcc@gmail.com
      </a>
    </footer>
  );
}
