"use client";

import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/ui";
import Image from "next/image";

interface SharedProps extends PropsWithClassName {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export const NotFound = ({ width = 180, height = 180, children, className }: SharedProps) => (
  <div className={cn("flex flex-col items-center gap-4", className)}>
    <Image src="/empty.svg" alt="empty" height={height} width={width} />
    {children}
  </div>
);

export const NoContent = ({ width = 180, height = 180, children, className }: SharedProps) => (
  <div className={cn("flex flex-col items-center gap-4", className)}>
    <Image src="/create.svg" alt="empty" height={height} width={width} />
    {children}
  </div>
);
