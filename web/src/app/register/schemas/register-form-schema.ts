import { z } from "zod";

export const registerFormSchema = z.object({
    name:
        z.string()
            .min(1, "Name must be at least 1 character long.")
            .max(32, "Name must be at most 32 characters long."),
    email:
        z.string()
            .email("Please enter a valid email address"),
    password:
        z.string()
            .min(8, "Password must be at least 8 characters long.")
            .max(71, "Password must be at most 71 characters long."),
    confirmPassword:
        z.string()
            .min(8, "Password must be at least 8 characters long.")
            .max(71, "Password must be at most 71 characters long."),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

export type registerFormValues = z.infer<typeof registerFormSchema>;

export const defaultRegisterFormValues: registerFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}