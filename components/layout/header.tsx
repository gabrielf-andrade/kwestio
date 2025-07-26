import AuthButtons from "@/components/navigation/auth-buttons";
import MobileNavClient from "@/components/navigation/mobile-nav-client";
import NavbarLinks from "@/components/navigation/navbar-links";
import SignoutButton from "@/components/navigation/signout-button";
import LogoLink from "@/components/shared/logo-link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { auth } from "@/lib/auth";
import * as motion from "motion/react-client";
import { headers } from "next/headers";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background backdrop-blur-md">
        <div className="lg:container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LogoLink size="md" />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hidden lg:block">
                <NavbarLinks />
              </motion.div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {!session && <AuthButtons session={session} />}
              <ThemeToggle />
              {session && <SignoutButton />}
            </div>

            <MobileNavClient session={session} />
          </div>
        </div>
      </header>
    </>
  );
}
