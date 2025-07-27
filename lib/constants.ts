export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const ROUTES = {
  home: "/",
  signin: "/auth/signin",
  signup: "/auth/signup",
  dashboard: "/dashboard",
  account: "dashboard/account",
  bookmarks: "dashboard/bookmarks",
} as const;

export const NAVBAR_LINKS = [
  { label: "Pricing", href: "#pricing" }, //"/pricing"
  { label: "About", href: "#about" }, //"/about"
] as const;
