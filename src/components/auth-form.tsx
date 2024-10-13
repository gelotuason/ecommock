'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signin, signup } from "@/lib/features/auth/authSlice";

export default function AuthForm() {
    const [activeTab, setActiveTab] = useState('signin');

    return (
        <main className="flex-1 container py-10 px-4 mx-auto max-w-[400px]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-white">
                    <TabsTrigger value="signin">Sign in</TabsTrigger>
                    <TabsTrigger value="signup">Sign up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Sign in to continue.</CardTitle>
                            <CardDescription className="sr-only"></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SigninForm />
                        </CardContent>
                        <CardFooter className="sr-only"></CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Create an account.</CardTitle>
                            <CardDescription className="sr-only"></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignupForm setActiveTab={setActiveTab} />
                        </CardContent>
                        <CardFooter className="sr-only"></CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}

function SigninForm() {
    // TODO: add loading when submitting

    const signinSchema = z.object({
        username: z.string(),
        password: z.string(),
    });

    const signinForm = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const error = useAppSelector(state => state.authReducer.errors.signin);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSignin = async (values: z.infer<typeof signinSchema>) => {
        try {
            await dispatch(signin({ username: values.username, password: values.password })).unwrap();

            router.back();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Form {...signinForm}>
            <form onSubmit={signinForm.handleSubmit(handleSignin)} className="space-y-2">
                <FormField
                    control={signinForm.control}
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
                    control={signinForm.control}
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

                <p className="text-red-500 text-sm h-10">{error && error}</p>

                <Button type="submit">Sign in</Button>
            </form>
        </Form>
    )
}

function SignupForm({ setActiveTab }: { setActiveTab: Dispatch<SetStateAction<string>> }) {
    // TODO: add loading when submitting

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

    const error = useAppSelector(state => state.authReducer.errors.signup);
    const dispatch = useAppDispatch();

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