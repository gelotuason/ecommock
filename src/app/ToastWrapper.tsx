'use client';

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import { ToastProvider } from "@/components/ui/toast";
import { clearCartAlert } from "@/lib/features/cart/cartSlice";
import { clearWishlistAlert } from "@/lib/features/wishlist/wishlistSlice";


export default function ToastWrapper({ children }: { children: React.ReactNode }) {
    const cartAlert = useAppSelector(state => state.cartReducer.alert);
    const wishlistAlert = useAppSelector(state => state.wishlistReducer.alert);
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    useEffect(() => {
        if (cartAlert.message) {
            toast({
                title: cartAlert.message.toString(),
                description: cartAlert.productName,
                duration: 3000,
            });

            dispatch(clearCartAlert());
        }

        if (wishlistAlert.message) {
            toast({
                title: wishlistAlert.message.toString(),
                description: wishlistAlert.productName,
                duration: 3000,
            });

            dispatch(clearWishlistAlert());
        }
    }, [cartAlert, wishlistAlert]);

    return <ToastProvider>{children}</ToastProvider>
}