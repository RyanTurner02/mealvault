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
import { toast } from "sonner";
import {
  defaultEmailFormValues,
  emailFormSchema,
  emailFormValues,
} from "@/app/settings/schemas/email-form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContextType } from "@/app/types/user-context-type";

interface UpdateEmailCardProps {
  userContext: UserContextType;
}

export function UpdateEmailCard({ userContext }: UpdateEmailCardProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<emailFormValues>({
    resolver: zodResolver(emailFormSchema),
    mode: "onChange",
    defaultValues: defaultEmailFormValues(userContext.user?.email),
  });

  const onSubmit = async (values: emailFormValues) => {
    const result: boolean = await updateEmail(values.newEmail);

    if (!result) {
      toast.error("Failed to update email.");
      return;
    }

    setValue("oldEmail", values.newEmail, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (userContext?.user) {
      userContext.user.email = values.newEmail;
    }
    
    toast.success("Successfully updated email.");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Email Address</CardTitle>
        <CardDescription>
          Change your email address. You&apos;ll need to verify your new email.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="current-email">Current Email Address</Label>
              <Input
                id="current-email"
                type="email"
                placeholder="someone@example.com"
                {...register("oldEmail")}
                disabled
              />
              {errors.oldEmail && (
                <small className="text-red-600">
                  {errors.oldEmail.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-email">New Email Address</Label>
              <Input
                id="new-email"
                type="email"
                placeholder="someone@example.com"
                {...register("newEmail")}
              />
              {errors.newEmail && (
                <small className="text-red-600">
                  {errors.newEmail.message}
                </small>
              )}
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
