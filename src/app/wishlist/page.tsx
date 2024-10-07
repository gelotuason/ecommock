'use client';

import Link from "next/link";
import ProductCard from "@/components/product/product-card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useAppSelector } from "@/lib/hooks";

export default function Wishlist() {
    const { wishlists } = useAppSelector(state => state.wishlistReducer);

    return (
        <main className="px-4 py-8 flex flex-col flex-1">
            <h2 className="text-4xl mb-2 text-center">Wishlist</h2>
            <Breadcrumb className="mb-4 flex justify-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-primary">Wishlist</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            {wishlists.length !== 0
                ? wishlists.map(wishlist => (
                    <section className="grid grid-cols-2 gap-x-3 gap-y-8">
                        <ProductCard product={wishlist} />
                    </section>
                ))
                : <p className="text-center mt-10">No products were added to the wishlist. <Link href='/shop' className="underline">Back to shopping.</Link></p>
            }
        </main>
    )
}