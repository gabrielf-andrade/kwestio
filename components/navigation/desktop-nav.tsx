import SignoutButton from "@/components/buttons/signout-button";
import AuthButtons from "@/components/navigation/auth-buttons";
import NavbarLinks from "@/components/navigation/navbar-links";
import LogoLink from "@/components/shared/logo-link";
import UserMenuButtons from "@/components/shared/user-menu-buttons";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Session } from "@/lib/auth-client";
import * as motion from "motion/react-client";

interface DesktopNavProps {
  session: Session | null;
}

export default async function DesktopNav({ session }: DesktopNavProps) {
  return (
    <>
      <div className="hidden lg:flex items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <LogoLink size="md" />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <NavbarLinks />
        </motion.div>
      </div>

      <div className="hidden lg:flex items-center gap-6">
        {!session && <AuthButtons session={session} />}
        {session && <UserMenuButtons session={session} />}
        <ThemeToggle />
        {session && <SignoutButton />}
      </div>
    </>
  );
}
