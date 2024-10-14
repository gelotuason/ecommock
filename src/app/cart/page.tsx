'use client';

import Link from "next/link";
import CartProduct from "@/components/cart/cart-product";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";

export default function Cart() {
    const cartProducts = useAppSelector(state => state.cartReducer.products);

    const subtotal = useMemo(() => {
        let sum = cartProducts.reduce((sum, product) => sum + (product.quantity * product.price), 0);

        return sum;
    }, [cartProducts])

    return (
        <main className="px-4 py-8 flex-1">
            <h2 className="text-4xl mb-2 text-center">Your Cart</h2>
            <Breadcrumb className="mb-4 flex justify-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-primary">Your Shopping Cart</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            {cartProducts.length !== 0
                ? <>
                    <section className='divide-y'>
                        {cartProducts.map((cartProduct, index) => (
                            <CartProduct key={index} {...cartProduct} />))}
                    </section>

                    <section className="bg-white px-3 py-6 mt-8 space-y-6">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-medium">Subtotal</h3>
                            <p className="text-xl font-medium">${subtotal}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                        </div>

                        <Button className="w-full">Checkout</Button>
                    </section>
                </>

                : <p className="text-center mt-10">No products were added to the cart. <Link href='/shop' className="underline">Back to shopping.</Link></p>
            }
        </main>
    )
}