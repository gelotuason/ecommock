'use client';

import SigninForm from "@/components/auth/signin-form";
import SignupForm from "@/components/auth/signup-form";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Authentication() {
    const { isAuthenticated } = useAppSelector(state => state.authReducer.user);
    const router = useRouter();

    const [isRedirecting, setIsRedirecting] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');

    useEffect(() => {
        if (isAuthenticated && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/');
        }
    }, [isAuthenticated, router, isRedirecting]);

    return (
        <main className="flex-1 container py-24 px-4 mx-auto max-w-[400px]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
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