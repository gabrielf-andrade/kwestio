import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

interface LogoLinkProps {
  size?: "sm" | "md" | "lg";
}

export default function LogoLink({ size = "md" }: LogoLinkProps) {
  const sizes = {
    sm: {
      span: "size-6",
      icon: "size-4",
      text: "text-base",
    },
    md: {
      span: "size-8",
      icon: "size-5",
      text: "text-xl",
    },
    lg: {
      span: "size-10",
      icon: "size-6",
      text: "text-2xl",
    },
  };

  return (
    <Link href={ROUTES.home} className="flex items-center justify-center gap-2">
      <span
        className={cn(
          "bg-primary text-primary-foreground rounded-lg flex items-center justify-center",
          sizes[size].span
        )}
      >
        <MessageCircle className={cn(sizes[size].icon)} />
      </span>
      <span className={cn("font-bold text-foreground", sizes[size].text)}>Kwestio</span>
    </Link>
  );
}
