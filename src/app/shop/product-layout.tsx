'use client';

import ProductCard from "@/components/product/product-card";
import ShopControlBar from "@/components/shop-control-bar";
import { useState } from "react";
import { Product } from "@/lib/types";

export default function ProductLayout({ products }: { products: Product[] }) {
    const initialLayout = 'grid-cols-2 lg:grid-cols-3';
    const [layout, setLayout] = useState(initialLayout);

    return (
        <section className="px-4 py-10">
            <ShopControlBar setLayout={setLayout} />
            <div className={`grid ${layout} gap-x-3 gap-y-8 py-8`}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}