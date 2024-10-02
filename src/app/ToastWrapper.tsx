'use client';

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider } from "@/components/ui/toast";
import { clearAlert } from "@/lib/features/cart/cartSlice";


export default function ToastWrapper({ children }: { children: React.ReactNode }) {
    const alert = useAppSelector(state => state.cartReducer.alert);
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    if (alert.type === 'add' || alert.type === 'remove') {
        toast({
            title: alert.message?.toString(),
            description: alert.productName,
            duration: 3000,
        });

        dispatch(clearAlert());
    }

    return <ToastProvider>{children}</ToastProvider>
}