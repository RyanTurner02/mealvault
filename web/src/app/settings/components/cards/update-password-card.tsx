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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  defaultPasswordFormValues,
  passwordFormSchema,
  passwordFormValues,
} from "@/app/settings/schemas/password-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function UpdatePasswordCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    mode: "all",
    defaultValues: defaultPasswordFormValues,
  });

  const onSubmit = async (values: passwordFormValues) => {
    const result: boolean = await updatePassword(
      values.oldPassword,
      values.newPassword
    );

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <small className="text-red-600">
                  {errors.oldPassword.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <small className="text-red-600">
                  {errors.newPassword.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-new-password">Confirm New Password</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirm new password"
                {...register("confirmNewPassword")}
              />
              {errors.confirmNewPassword && (
                <small className="text-red-600">
                  {errors.confirmNewPassword.message}
                </small>
              )}
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
