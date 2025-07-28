"use client";

import { SidebarItem } from "@/components/layout/sidebar-item";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { sidebarItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { PropsWithClassName } from "@/types/ui";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "../ui/button";

export const DesktopDashboardSidebar = ({ className }: PropsWithClassName) => {
  return (
    <aside className={cn("border-r border-border h-full shrink-0 grow-0 hidden lg:block lg:basis-[250px]", className)}>
      <DashboardSidebarContent />
    </aside>
  );
};

export const MobileDashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="pl-4 pt-4 lg:hidden">
        <div className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          <Menu className="w-5 h-5 mr-0.5" />
          <span>Menu</span>
        </div>
      </SheetTrigger>

      <SheetContent className="w-[250px]" side={"left"}>
        <SheetTitle className="px-4 py-3">Menu</SheetTitle>
        <DashboardSidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export const DashboardSidebarContent = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full px-3 lg:pt-4">
      <nav className="flex flex-col gap-y-2">
        {sidebarItems.map((item) => {
          const isActive = item.route === pathname;

          return (
            <Link key={item.name} href={item.route}>
              <SidebarItem icon={item.Icon} isActive={isActive} text={item.name} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
