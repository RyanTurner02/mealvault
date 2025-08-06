"use client";

import { UpdateEmailCard } from "@/app/settings/components/cards/update-email-card";
import { UpdatePasswordCard } from "@/app/settings/components/cards/update-password-card";
import { UpdateProfileCard } from "@/app/settings/components/cards/update-profile-card";
import { User } from "@/app/types/user";

interface SettingsFormProps {
  user: User;
}

export const SettingsForm = ({ user }: SettingsFormProps) => {
  const name = user?.name || "";
  const email = user?.email || "";

  return (
    <>
      <div className="mb-5">
        <UpdateProfileCard displayName={name} />
      </div>
      <div className="mb-5">
        <UpdateEmailCard email={email} />
      </div>
      <div className="mb-5">
        <UpdatePasswordCard />
      </div>
    </>
  );
};
