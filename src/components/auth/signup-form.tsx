'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const signupSchema = z.object({
    username: z.string()
        .min(6, {
            message: "Username must be at least 4 characters.",
        }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        }),
    confirmPassword: z.string()
        .min(6, {
            message: "Password must be at least 6 characters.",
        }),
});

export default function SignupForm() {
    // TODO: add loading when submitting
    // TODO: validate password and confirmpassword

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const handleSignup = (values: z.infer<typeof signupSchema>) => {

    };

    return (
        <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-2">
                <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input className="bg-white" placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only"></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className="bg-white" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only"></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input className="bg-white" type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only"></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input className="bg-white" type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only"></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <p className="text-red-500 text-sm h-5">Error message</p>

                <Button type="submit">Sign up</Button>
            </form>
        </Form>
    )
}