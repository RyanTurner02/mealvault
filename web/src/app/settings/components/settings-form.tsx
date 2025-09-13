"use client";

import { UpdateEmailCard } from "@/app/settings/components/cards/update-email-card";
import { UpdatePasswordCard } from "@/app/settings/components/cards/update-password-card";
import { UpdateProfileCard } from "@/app/settings/components/cards/update-profile-card";
import { UserContextType } from "@/app/types/user-context-type";

interface SettingsFormProps {
  userContext: UserContextType;
}

export const SettingsForm = ({ userContext }: SettingsFormProps) => {
  return (
    <>
      <div className="mb-5">
        <UpdateProfileCard userContext={userContext} />
      </div>
      <div className="mb-5">
        <UpdateEmailCard userContext={userContext} />
      </div>
      <div className="mb-5">
        <UpdatePasswordCard />
      </div>
    </>
  );
};
