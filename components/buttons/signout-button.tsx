"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { ROUTES } from "@/lib/constants";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {
  const router = useRouter();

  async function signOutAction() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(ROUTES.signin);
        },
      },
    });
  }
  return (
    <Button size="icon" variant="destructive" className="size-8" onClick={signOutAction} aria-label="Sign out">
      <LogOut className="size-4" aria-hidden />
    </Button>
  );
}
