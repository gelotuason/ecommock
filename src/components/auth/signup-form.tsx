'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signup } from "@/lib/features/auth/authSlice";
import { Dispatch, SetStateAction } from "react";

const signupSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    username: z.string()
        .min(6, { message: "Username must be at least 4 characters." }),
    firstname: z.string()
        .min(1, { message: 'Please enter your first name.' }),
    lastname: z.string()
        .min(1, { message: 'Please enter your last name.' }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters.", }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
});

export default function SignupForm({ setActiveTab }: { setActiveTab: Dispatch<SetStateAction<string>> }) {
    // TODO: add loading when submitting
    const error = useAppSelector(state => state.authReducer.errors.signup);
    const dispatch = useAppDispatch();

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: 'hakdog',
            email: 'hakdog@test.com',
            firstname: 'hakdog',
            lastname: 'hakdog',
            password: 'hakdog',
            confirmPassword: 'hakdog',
        },
    });

    const handleSignup = async (values: z.infer<typeof signupSchema>) => {
        try {
            await dispatch(signup({ ...values })).unwrap();

            setActiveTab('signin');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-2">
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
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input className="bg-white" placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormDescription className="sr-only"></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={signupForm.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input className="bg-white" placeholder="Enter your last name" {...field} />
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

                <p className="text-red-500 text-sm h-5">{error && error}</p>

                <Button type="submit">Sign up</Button>
            </form>
        </Form>
    )
}