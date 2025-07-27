import { NotFound } from "@/components/shared/illustrations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <NotFound>We couldn&apos;t find what you were looking for.</NotFound>
      <Button variant="link" size="lg" asChild>
        <Link href="/">
          <ArrowLeft className="mr-0.5 size-3" /> Go Home
        </Link>
      </Button>
    </div>
  );
}
