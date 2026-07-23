"use client";

import { useState } from "react";
import type { NavLink } from "@/data/nav";

export default function Header({
  mode,
  links,
}: {
  mode: "scroll" | "route";
  links: NavLink[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = 91;
      const y = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header */}
      <header className="ns-header">
        <a
          href={mode === "scroll" ? "#" : "/"}
          className="ns-logo"
          onClick={
            mode === "scroll"
              ? (e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              : undefined
          }
        >
          <img
            src="/logo.png"
            alt=""
            className="h-[16px] w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          NORTHSTACK
        </a>
        <nav className="ns-nav">
          {links.map((link) => {
            const isAnchor = mode === "scroll" && !link.route;
            return (
              <a
                key={link.label}
                href={link.href}
                className="ns-nav-link"
                onClick={
                  isAnchor
                    ? (e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }
                    : undefined
                }
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button
            type="button"
            className="mobile-menu-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {links.map((link) => {
            const isAnchor = mode === "scroll" && !link.route;
            return (
              <a
                key={link.label}
                href={link.href}
                className="mobile-menu-link"
                onClick={
                  isAnchor
                    ? (e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        scrollTo(link.href);
                      }
                    : () => setMenuOpen(false)
                }
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
