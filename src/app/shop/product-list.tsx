'use client';

import ProductCard from "@/components/product/product-card";
import ShopControlBar from "@/components/shop-control-bar";
import { useState, useMemo } from "react";
import { Product } from "@/lib/types";

export default function ProductList({ initialProducts }: { initialProducts: Product[] }) {
    const initialLayout = 'grid-cols-2 lg:grid-cols-3';
    const [layout, setLayout] = useState(initialLayout);
    const [sortBy, setSortBy] = useState<'bestSelling' | 'titleAsc' | 'titleDesc' | 'priceAsc' | 'priceDesc' | ''>('');

    const sortedAndFilteredProducts = useMemo(() => {
        let result = [...initialProducts];

        switch (sortBy) {
            case 'bestSelling':
                return result.filter(product => product.rating.count > 399);
            case 'titleAsc':
                return result.sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return result.sort((a, b) => b.title.localeCompare(a.title));
            case 'priceAsc':
                return result.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return result.sort((a, b) => b.price - a.price);
            default:
                return result;
        }
    }, [initialProducts, sortBy]);

    return (
        <section className="px-4 py-10">
            <ShopControlBar sortBy={sortBy} setSortBy={setSortBy} setLayout={setLayout} />
            <div className={`grid ${layout} gap-x-3 gap-y-8 py-8`}>
                {sortedAndFilteredProducts && sortedAndFilteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}