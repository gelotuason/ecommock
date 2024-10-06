'use client';

import ProductDetail from "./product-detail";
import ProductRating from "@/components/product/product-rating";
import { ShoppingCart, Heart, Search } from "lucide-react";
import { Product } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";
import { addToCartAsync } from "@/lib/features/cart/cartThunks";
import { addToWishlist } from "@/lib/features/wishlist/wishlistSlice";

export default function ProductCard({ product }: { product: Product }) {
    // TODO: find added to cart and wishlist. if added, change action button css
    // TODO: if at /wishlist path, change the heart icon to X icon

    const dispatch = useAppDispatch();
    const [productDetailDialog, toggleProductDetailDialog] = useState(false);

    return (
        <div>
            <div className="relative bg-white">
                <img src={product.image} alt={product.title} className="h-[128px] mx-auto bg-white" />
                <div className="absolute inset-x-0 bottom-2">
                    <div className="bg-[#f5f5f5] rounded flex items-center w-max divide-x shadow-lg mx-auto">
                        <button
                            className="p-1 hover:bg-black hover:rounded-s hover:text-white transition-all duration-300"
                            onClick={() => dispatch(addToCartAsync({ product, quantity: 1 }))}
                        >
                            <ShoppingCart size={20} strokeWidth={1} />
                        </button>
                        <button
                            className="p-1 hover:bg-black hover:text-white transition-all duration-300"
                            onClick={() => dispatch(addToWishlist(product))}
                        >
                            <Heart size={20} strokeWidth={1} />
                        </button>
                        <button
                            className="p-1 hover:bg-black hover:rounded-e hover:text-white transition-all duration-300"
                            onClick={() => toggleProductDetailDialog(true)}
                        >
                            <Search size={20} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-2 px-1 space-y-1 text-sm">
                <p>${product.price}</p>
                <ProductRating className="text-accent flex" productRating={product.rating.rate} />
                <p className="font-medium">{product.title}</p>
            </div>

            <ProductDetail open={productDetailDialog} onOpenChange={toggleProductDetailDialog} product={product} />
        </div>
    )
}