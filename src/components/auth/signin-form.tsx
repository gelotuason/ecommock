'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login } from "@/lib/features/auth/authSlice";

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
});

export default function SigninForm() {
    // TODO: add loading when submitting

    const { error } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const signinForm = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            username: "mor_2314",
            password: "83r5^_",
        },
    });

    const handleSignin = (values: z.infer<typeof signinSchema>) => {
        dispatch(login({ username: values.username, password: values.password }));
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

                <p className="text-red-500 text-sm h-5">{error && error}</p>

                <Button type="submit">Sign in</Button>
            </form>
        </Form>
    )
}