export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const routes = {
  home: "/",
  signin: "/auth/signin",
  signup: "/auth/signup",
  dashboard: "/dashboard",
  account: "dashboard/account",
  bookmarks: "dashboard/bookmarks",
} as const;
