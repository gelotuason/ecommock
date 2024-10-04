'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login } from "@/lib/features/auth/authSlice";

const formSchema = z.object({
    username: z.string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        }),
    password: z.string()
        .min(2, {
            message: "Password must be at least 2 characters.",
        })
})

export default function LoginForm() {
    const { error, isAuthenticated } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        dispatch(login({ username: values.username, password: values.password }));
    }

    if (isAuthenticated) router.push('/');

    return (
        <main className="flex-1 flex justify-center items-center px-4 py-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="bg-background space-y-4 p-6 border rounded w-96">
                    <h1 className="text-2xl">Login to continue.</h1>
                    <FormField
                        control={form.control}
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
                        control={form.control}
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

                    <p className="text-red-500 text-sm">{error && error}</p>

                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </main>
    )
}