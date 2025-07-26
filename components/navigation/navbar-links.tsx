import { NAVBAR_LINKS } from "@/lib/constants";
import Link from "next/link";

export default function NavbarLinks() {
  return (
    <nav className="flex flex-col gap-4 px-4 py-6 lg:flex lg:flex-row lg:items-center lg:p-0">
      {NAVBAR_LINKS.map((link) => {
        return (
          <Link
            key={link.href}
            href={link.href}
            className="font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
