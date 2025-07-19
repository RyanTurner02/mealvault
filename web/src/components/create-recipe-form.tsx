"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
    name: z.string().min(1, "Enter a recipe name"),
    prepTime: z.string().min(1, "Enter prep time"),
    cookTime: z.string().min(1, "Enter cook time"),
    ingredients: z.string().min(1, "Enter ingredients"),
    instructions: z.string().min(1, "Enter recipe instructions"),
    links: z.string().optional(),
});

export const CreateRecipeForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            prepTime: "",
            cookTime: "",
            ingredients: "",
            instructions: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Form { ... form }>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl">Recipe Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Recipe Name" { ... field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl">Prep Time</FormLabel>
                                <FormControl>
                                    <Input placeholder="Prep Time" { ... field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl">Cook Time</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cook Time" { ... field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl">Ingredients</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Ingredients" { ... field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-2xl">Instructions</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Instructions" { ... field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="links"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between">
                                <FormLabel className="text-2xl">Links</FormLabel>
                                <Button type="button" variant="secondary">Add Link</Button>
                            </div>
                                <FormControl>
                                    <Input placeholder="Links" { ... field} />
                                </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-evenly">
                    <Button type="submit">Create</Button>
                    <Link href="/">
                        <Button type="button" variant="destructive">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </Form>
    );
}