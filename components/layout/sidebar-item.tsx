import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/ui";
import { ComponentType, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isActive: boolean;
  text: string;
  icon: ComponentType<PropsWithClassName>;
}>;

export const SidebarItem = ({ isActive, text, icon: Icon, children }: Props) => {
  return (
    <div
      role="item"
      className={cn(
        "flex p-4 rounded-lg text-sm gap-x-2 items-center transition-colors duration-150 select-none",
        isActive ? "bg-accent text-accent-foreground font-semibold" : "hover:bg-accent/50"
      )}
    >
      <Icon className="size-4" />
      <span>{text}</span>
      {children}
    </div>
  );
};
