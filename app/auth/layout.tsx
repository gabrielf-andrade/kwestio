import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export const dynamic = "force-dynamic";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col lg:justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-primary-foreground dark:bg-background">
        <div className="mx-auto w-full max-w-sm lg:w-96 space-y-4">{children}</div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-shape"></div>
      </div>
    </div>
  );
}
