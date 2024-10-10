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
    const wishlistNotification = useAppSelector(state => state.wishlistReducer.notification);
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

        if (wishlistNotification.message) {
            toast({
                title: wishlistNotification.message.toString(),
                description: wishlistNotification.productName,
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
    }, [cartNotification, cartError, wishlistNotification]);

    return <ToastProvider>{children}</ToastProvider>
}