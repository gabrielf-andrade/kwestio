"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/ui";
import BeatLoader from "react-spinners/BeatLoader";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <BeatLoader color="#2563eb" size={16} />
    </div>
  );
}

export function SkeletonLoader({ className }: PropsWithClassName) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Skeleton className={cn("bg-gray-100/50", className)} />
    </div>
  );
}
