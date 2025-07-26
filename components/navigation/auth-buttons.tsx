import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth-client";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AuthButtonsProps {
  session: Session | null;
}

export default function AuthButtons({ session }: AuthButtonsProps) {
  return (
    <div className={cn("flex justify-between px-4 py-6 lg:p-0", !session && "pb-0")}>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <Button size="sm" variant="default" className="w-full lg:w-auto" asChild>
          <Link href={ROUTES.signin}>Sign In</Link>
        </Button>
        <Button size="sm" variant="secondary" className="w-full lg:w-auto" asChild>
          <Link href={ROUTES.signup}>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
