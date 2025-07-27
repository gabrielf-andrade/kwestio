import NotificationsButton from "@/components/buttons/notifications-button";
import UserAvatar from "@/components/shared/user-avatar";
import { Session } from "@/lib/auth-client";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

interface UserMenuButtonsProps {
  session: Session;
}

export default function UserMenuButtons({ session }: UserMenuButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <NotificationsButton />
      <Link href={ROUTES.dashboard}>
        <UserAvatar name={session.user.name} image={session.user.image} className="border-2 border-white" />
      </Link>
    </div>
  );
}
