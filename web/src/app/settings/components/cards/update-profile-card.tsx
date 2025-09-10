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
import { updateName } from "@/app/settings/api/update-name";
import { toast } from "sonner";
import {
  defaultProfileFormValues,
  profileFormSchema,
  profileFormValues,
} from "@/app/settings/schemas/profile-form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateProfileCardProps {
  displayName: string;
}

export function UpdateProfileCard({ displayName }: UpdateProfileCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: defaultProfileFormValues(displayName),
  });

  const onSubmit = async (values: profileFormValues) => {
    const result: boolean = await updateName(values.name);

    if (!result) {
      toast.error("Failed to update name.");
      return;
    }

    toast.success("Successfully updated name.");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your personal information.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <small className="text-red-600">{errors.name.message}</small>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
