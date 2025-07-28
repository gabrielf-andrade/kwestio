import { BookMarked, Component, User } from "lucide-react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const ROUTES = {
  home: "/",
  signin: "/auth/signin",
  signup: "/auth/signup",
  dashboard: "/dashboard",
  account: "/dashboard/account",
  bookmarks: "/dashboard/bookmarks",
} as const;

export const NAVBAR_LINKS = [
  { label: "Pricing", href: "#pricing" }, //"/pricing"
  { label: "About", href: "#about" }, //"/about"
] as const;

export const sidebarItems = [
  {
    name: "My Events",
    route: ROUTES.dashboard,
    Icon: Component,
  },
  {
    name: "Bookmarks",
    route: ROUTES.bookmarks,
    Icon: BookMarked,
  },
  {
    name: "Account",
    route: ROUTES.account,
    Icon: User,
  },
] as const;
