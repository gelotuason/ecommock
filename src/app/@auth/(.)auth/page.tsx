'use client';

import AuthForm from "@/components/auth-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function AuthModal() {
    const router = useRouter();

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="sm:max-w-md max-h-full bg-transparent border-transparent text-white p-0 overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                <AuthForm />
                <DialogFooter className="sr-only" />
            </DialogContent>
        </Dialog>
    )
}