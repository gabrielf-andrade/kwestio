"use client";

import MobileButton from "@/components/navigation/mobile-button";
import MobileNav from "@/components/navigation/mobile-nav";
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
      <MobileButton isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />

      <MobileNav isMenuOpen={isMenuOpen} session={session} />

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm bg-black/80"
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
