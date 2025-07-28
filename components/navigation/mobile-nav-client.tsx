"use client";

import MobileButton from "@/components/navigation/mobile-button";
import MobileNav from "@/components/navigation/mobile-nav";
import LogoLink from "@/components/shared/logo-link";
import UserMenuButtons from "@/components/shared/user-menu-buttons";
import { Session } from "@/lib/auth-client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileNavClientProps {
  session: Session | null;
}

const overlay = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2 } },
  visible: { opacity: 1, backdropFilter: "blur(4px)", transition: { duration: 0.2 } },
};

export default function MobileNavClient({ session }: MobileNavClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="flex lg:hidden items-center gap-8">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <LogoLink size="md" />
        </motion.div>
      </div>
      <div className="flex lg:hidden items-center gap-8">
        {session && <UserMenuButtons session={session} />}
        <MobileButton isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
      </div>

      <MobileNav isMenuOpen={isMenuOpen} session={session} />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm bg-black/50"
                variants={overlay}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
