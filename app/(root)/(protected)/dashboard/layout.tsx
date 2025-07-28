import { DesktopDashboardSidebar, MobileDashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { PropsWithChildren } from "react";

export default function DashBoardLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-row h-full">
      <DesktopDashboardSidebar />

      <div className="flex flex-col overflow-auto w-full items-start grow-1">
        <MobileDashboardSidebar />

        {children}
      </div>
    </div>
  );
}
