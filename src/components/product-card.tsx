'use client';

import ProductDetail from "./product-detail";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "@/hooks/use-toast"

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const handleAddToCart = () => {
        dispatch(addToCart({ product, quantity: 1 }));
        toast({ title: 'Successfully added to cart.' })
    }

    return (
        <div>
            <div className="relative bg-white">
                <img src={product.image} alt={product.title} className="h-[128px] mx-auto bg-white" />
                <div className="absolute inset-x-0 bottom-2">
                    <div className="bg-[#f5f5f5] rounded flex items-center w-max divide-x shadow-lg mx-auto">
                        <button className="p-1 hover:bg-black hover:text-white transition-all duration-300" onClick={handleAddToCart}>
                            <ShoppingCart size={20} strokeWidth={1} />
                        </button>
                        <button className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                            <Heart size={20} strokeWidth={1} />
                        </button>

                        <ProductDetail productId={product.id} />
                    </div>
                </div>
            </div>

            <div className="mt-2 px-1 space-y-1 text-sm">
                <p>${product.price}</p>
                <p className="text-accent">{product.rating.rate} rating</p>
                <p className="font-medium">{product.title}</p>
            </div>
        </div>
    )
}