import { z } from "zod";

export const profileFormSchema = z.object({
    name:
        z.string()
            .trim()
            .min(1, "Name must be at least 1 character long.")
            .max(32, "Name must be at most 32 characters long."),
});

export type profileFormValues = z.infer<typeof profileFormSchema>;

export const defaultProfileFormValues = (name: string = ""): profileFormValues => ({
    name: name
});