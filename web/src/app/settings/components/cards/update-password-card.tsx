import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { updatePassword } from "@/app/settings/api/update-password";
import { ChangeEventHandler, useState } from "react";
import { toast } from "sonner";

export function UpdatePasswordCard() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const updateOldPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setOldPassword(e.target.value);
  };

  const updateNewPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPassword(e.target.value);
  };

  const updateConfirmPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: boolean = await updatePassword(oldPassword, newPassword);

    if (!result) {
      toast.error("Failed to update password.");
      return;
    }

    toast.success("Successfully updated password.");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={updateOldPassword}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={updateNewPassword}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={updateConfirmPassword}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
