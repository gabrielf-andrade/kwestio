import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(ROUTES.signin);
  }
  return <>{children}</>;
}
