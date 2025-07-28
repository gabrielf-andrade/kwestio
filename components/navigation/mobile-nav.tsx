import SignoutButton from "@/components/buttons/signout-button";
import AuthButtons from "@/components/navigation/auth-buttons";
import NavbarLinks from "@/components/navigation/navbar-links";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Session } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

interface MobileNavProps {
  isMenuOpen: boolean;
  session: Session | null;
}

const menu = {
  visible: { height: "auto", transition: { duration: 0.4 } },
  hidden: { height: 0, transition: { duration: 0.4 } },
};

export default function MobileNav({ isMenuOpen, session }: MobileNavProps) {
  return (
    <AnimatePresence mode="wait">
      {isMenuOpen && (
        <motion.div
          className="z-50 lg:hidden overflow-hidden border-y absolute top-full left-0 w-full bg-background backdrop-blur-md"
          variants={menu}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
        >
          {!session && <AuthButtons session={session} />}

          <NavbarLinks />

          <div
            className={cn(
              "p-4 border-t border-border flex items-center justify-between w-full",
              !session && "justify-end"
            )}
          >
            {session && <SignoutButton />}
            <div className="flex items-center gap-2 justify-center">
              <span className="text-sm flex-1">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
