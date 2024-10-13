'use client';

import AuthForm from "@/components/auth-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";

export default function Auth() {
    const { isAuthenticated } = useAppSelector(state => state.authReducer.user);
    const router = useRouter();

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/');
        }
    }, [isAuthenticated, router, isRedirecting]);

    return <AuthForm />
}