"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const ForgotPasswordForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
            </CardHeader>
            <CardContent>
                <Form { ... form }>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="someone@example.com" { ... field } />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email address to receive a password reset link.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Reset Password</Button>
                        <div className="flex justify-center text-sm text-center">
                            <Link href="/login" className="underline underline-offset-4">Back to login</Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}