import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function LandingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
