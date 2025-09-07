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
import { updateEmail } from "@/app/settings/api/update-email";
import { ChangeEventHandler, useState } from "react";
import { toast } from "sonner";

interface UpdateEmailCardProps {
  currentEmail: string;
}

export function UpdateEmailCard({ currentEmail }: UpdateEmailCardProps) {
  const [oldEmail, setOldEmail] = useState<string>(currentEmail);
  const [newEmail, setNewEmail] = useState<string>("");

  const updateNewEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (oldEmail === newEmail) {

    }

    const result: boolean = await updateEmail(newEmail);

    if (!result) {
      toast("Failed to update email. Please try again.");
      return;
    }

    setOldEmail(newEmail);
    toast("Successfully updated email.");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
        <CardDescription>
          Change your email address. You&apos;ll need to verify your new email.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-email">Current Email Address</Label>
              <Input
                id="current-email"
                type="email"
                placeholder="someone@example.com"
                value={oldEmail}
                disabled
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-email">New Email Address</Label>
              <Input
                id="new-email"
                type="email"
                placeholder="someone@example.com"
                value={newEmail}
                onChange={updateNewEmail}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Update Email
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
