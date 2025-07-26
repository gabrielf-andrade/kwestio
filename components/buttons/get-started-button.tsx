import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Session } from "@/lib/auth-client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";

const btnClasses = cn(buttonVariants(), "p-6 text-sm lg:text-lg");

interface GetStartedButtonProps {
  session: Session | null;
}

export default function GetStartedButton({ session }: GetStartedButtonProps) {
  if (!session) {
    return <GetStartedSignUpLink className={btnClasses}>Get Started 👉</GetStartedSignUpLink>;
  }

  return (
    <Button size={"lg"} variant={"default"} asChild>
      <Link href={ROUTES.dashboard}>Get Started 👉</Link>
    </Button>
  );
}

function GetStartedSignUpLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <Button size={"lg"} variant={"default"} asChild>
      <Link href={ROUTES.signup} className={className} {...props}>
        Get Started 👉
      </Link>
    </Button>
  );
}
