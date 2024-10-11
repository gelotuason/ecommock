'use client';

import CartProduct from "@/components/cart/cart-product";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/lib/hooks";

export default function Cart() {
    const cartProducts = useAppSelector(state => state.cartReducer.products);

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

            <div className='divide-y'>
                {cartProducts && cartProducts.map((cartProduct, index) => (
                    <CartProduct key={index} {...cartProduct} />
                ))}
            </div>
        </main>
    )
}