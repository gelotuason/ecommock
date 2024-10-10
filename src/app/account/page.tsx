'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signout } from "@/lib/features/auth/authSlice";
import { useEffect, useState } from "react";

export default function MyAccount() {
    const { user } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!user.isAuthenticated && !isRedirecting) {
            setIsRedirecting(true);
            router.push('/auth');
        }
    }, [user.isAuthenticated, router, isRedirecting]);

    return (
        <main className="px-4 py-10 flex-1">
            <h2 className="text-4xl mb-2 text-center">My Account</h2>
            <Breadcrumb className="mb-4 flex justify-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-primary">Account</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col divide-y rounded border">
                <button className="px-4 py-2 text-start bg-background rounded-t">Dashboard</button>
                <Link href='/wishlist' className="px-4 py-2 hover:bg-background">Your wishlist</Link>
                <button onClick={() => dispatch(signout())} className="px-4 py-2 text-start hover:bg-background">Logout</button>
            </div>

            <div className="mt-4 text-lg">Welcome <span className="font-medium">{user.firstname}</span>!</div>

            <section className="mt-8">
                <h2 className="text-2xl font-medium">Order history</h2>
                <div className="mt-2 px-4 py-2 bg-lime-200 rounded-lg">
                    <p>Make your first order. You haven't placed any orders yet.</p>
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-medium">Account details</h2>
                <div className="mt-2 break-all border">
                    <div className="flex justify-center">
                        <p className="px-4 py-2 w-full my-auto">Name</p>
                        <Separator orientation="vertical" className="h-auto" />
                        <p className="px-4 py-2 w-full my-auto">{user.firstname} {user.lastname}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-center">
                        <p className="px-4 py-2 w-full my-auto">Email</p>
                        <Separator orientation="vertical" className="h-auto" />
                        <p className="px-4 py-2 w-full my-auto">{user.email}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}