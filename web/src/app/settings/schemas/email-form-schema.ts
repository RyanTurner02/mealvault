import { z } from "zod";

export const emailFormSchema = z.object({
    oldEmail:
        z.string()
            .trim()
            .email("Please enter a valid email address"),
    newEmail:
        z.string()
            .trim()
            .email("Please enter a valid email address"),
}).refine(data => data.oldEmail !== data.newEmail, {
    message: "New email address cannot be the same as your current one.",
    path: ["newEmail"],
});

export type emailFormValues = z.infer<typeof emailFormSchema>;

export const defaultEmailFormValues = (oldEmail: string = ""): emailFormValues => ({
    oldEmail: oldEmail,
    newEmail: "",
});