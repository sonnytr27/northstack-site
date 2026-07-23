export type NavLink = {
  label: string;
  href: string;
  /**
   * Force a real navigation even in scroll mode (no preventDefault).
   * Used for WORK, which is a route on every page including the homepage.
   */
  route?: boolean;
};

/** Homepage nav — in-page anchors, except WORK which is a real route. */
export const SCROLL_NAV: NavLink[] = [
  { label: "WORK", href: "/work", route: true },
  { label: "SERVICES", href: "#services" },
  { label: "PRODUCTS", href: "#products" },
  { label: "START A PROJECT", href: "#contact" },
];

/** Route nav — shared by the Telegram product page and both Work pages. */
export const ROUTE_NAV: NavLink[] = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/" },
  { label: "PRODUCTS", href: "/products/telegram-bot" },
  { label: "START A PROJECT", href: "/#contact" },
];
