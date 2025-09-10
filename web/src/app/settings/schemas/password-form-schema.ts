import { z } from "zod";

export const passwordFormSchema = z.object({
    oldPassword:
        z.string()
            .trim(),
    newPassword:
        z.string()
            .trim()
            .min(8, "Password must be at least 8 characters long.")
            .max(71, "Password must be at most 71 characters long.")
            .regex(/[a-z]+/, "Password must contain at least 1 lowercase character.")
            .regex(/[A-Z]+/, "Password must contain at least 1 uppercase character.")
            .regex(/[0-9]+/, "Password must contain at least 1 number.")
            .regex(/[!@#$%^&]+/, "Password must contain at least 1 special character: !, @, #, $, %, ^, &, or *."),
    confirmNewPassword:
        z.string()
            .trim(),
}).superRefine((val, ctx) => {
    if (val.oldPassword === val.newPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "New password must not match current password.",
            path: ["newPassword"],
        })
    }

    if (val.newPassword !== val.confirmNewPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "New passwords do not match.",
            path: ["confirmNewPassword"],
        })
    }
});

export type passwordFormValues = z.infer<typeof passwordFormSchema>;

export const defaultPasswordFormValues: passwordFormValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
}