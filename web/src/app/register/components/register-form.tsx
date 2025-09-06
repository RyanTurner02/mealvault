import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useUserContext } from "@/app/hooks/use-user-context";
import { UserContextType } from "@/app/types/user-context-type";
import { useCreateAccount } from "@/app/features/register/hooks/use-create-account";
import { createAccount } from "@/app/features/register/api/create-account";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultRegisterFormValues,
  registerFormSchema,
  registerFormValues,
} from "@/app/register/schemas/register-form-schema";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const form = useForm<registerFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultRegisterFormValues,
    mode: "onTouched",
  });
  const [registerError, setRegisterError] = useState(false);

  const userContext: UserContextType | null = useUserContext();
  const router: AppRouterInstance = useRouter();
  const { handleCreateAccount } = useCreateAccount({
    userContext,
    createAccount,
  });

  useEffect(() => {
    if (!userContext?.isLoading && userContext?.user) {
      router.push("/");
    }
  }, [userContext?.isLoading, userContext?.user, router]);

  const onSubmit = async (values: registerFormValues) => {
    const result: boolean = await handleCreateAccount(
      values.name,
      values.email,
      values.password
    );

    if (!result) {
      setRegisterError(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="someone@example.com"
                  aria-invalid={!!errors.email}
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-invalid={!!errors.password}
                  autoComplete="new-password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  aria-invalid={!!errors.confirmPassword}
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {registerError && (
                <p className="text-sm text-red-500">
                  Unable to create account
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </Button>
            </div>

            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
