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
    message: "Current email must not match with the new email.",
    path: ["newEmail"],
});

export type emailFormValues = z.infer<typeof emailFormSchema>;

export const defaultEmailFormValues: emailFormValues = {
    oldEmail: "",
    newEmail: "",
}