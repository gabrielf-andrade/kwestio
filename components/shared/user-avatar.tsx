"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PropsWithClassName } from "@/types/ui";
import { AnimatePresence, motion } from "motion/react";

interface UserAvatarProps extends PropsWithClassName {
  name: string;
  image?: string | null;
}

function getFullNameInitials(fullName: string): string {
  if (!fullName) {
    return "";
  }
  const initials = fullName.match(/\b\w/g) || [];
  return initials.join("").toUpperCase();
}

function isImageUrl(url: string | null | undefined): boolean {
  if (!url) {
    return false;
  }
  return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:");
}

export default function UserAvatar({ name, image, className }: UserAvatarProps) {
  const isImage = isImageUrl(image);

  return (
    <Avatar className={className}>
      <AnimatePresence>
        {isImage && (
          <motion.div
            key="avatar-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <AvatarImage src={image!} alt={name} />
          </motion.div>
        )}
      </AnimatePresence>
      <AvatarFallback
        style={{ backgroundColor: isImage ? undefined : image || undefined }}
        className="text-white text-xs font-semibold"
      >
        {getFullNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
