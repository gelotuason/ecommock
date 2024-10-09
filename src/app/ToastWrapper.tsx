'use client';

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider } from "@/components/ui/toast";
import { clearMessages } from "@/lib/features/cart/cartSlice";
import { clearWishlistAlert } from "@/lib/features/wishlist/wishlistSlice";

export default function ToastWrapper({ children }: { children: React.ReactNode }) {
    const cartNotification = useAppSelector(state => state.cartReducer.notification);
    const cartError = useAppSelector(state => state.cartReducer.error);
    const wishlistAlert = useAppSelector(state => state.wishlistReducer.alert);
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    useEffect(() => {
        if (cartNotification.message) {
            toast({
                title: cartNotification.message.toString(),
                description: cartNotification.productName,
                duration: 3000,
            });

            dispatch(clearMessages());
        }

        if (wishlistAlert.message) {
            toast({
                title: wishlistAlert.message.toString(),
                description: wishlistAlert.productName,
                duration: 3000,
            });

            dispatch(clearWishlistAlert());
        }

        if (cartError) {
            toast({
                variant: 'destructive',
                description: cartError,
                duration: 3000,
            });

            dispatch(clearMessages());
        }
    }, [cartNotification, cartError, wishlistAlert]);

    return <ToastProvider>{children}</ToastProvider>
}