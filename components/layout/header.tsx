import DesktopNav from "@/components/navigation/desktop-nav";
import MobileNavClient from "@/components/navigation/mobile-nav-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="z-50 w-full border-b border-border bg-background backdrop-blur-md relative">
      <div className="px-4 w-full">
        <div className="flex h-16 items-center justify-between">
          <DesktopNav session={session} />

          <MobileNavClient session={session} />
        </div>
      </div>
    </header>
  );
}
