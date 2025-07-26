import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface MobileButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isMenuOpen: boolean;
}

export default function MobileButton({ isMenuOpen, ...props }: MobileButtonProps) {
  return (
    <Button size="icon" variant="ghost" className="lg:hidden" {...props}>
      <AnimatePresence mode="wait">
        {isMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="size-6" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="size-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
