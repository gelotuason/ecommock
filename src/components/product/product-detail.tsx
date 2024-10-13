'use client';

import ProductRating from "@/components/product/product-rating";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Product } from "@/lib/types";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";

type ProductDetailProps = {
    selectedProduct: Product
    className?: {
        px: string
        pb: string
    }
}

export default function ProductDetail({ selectedProduct, className }: ProductDetailProps) {
    const wishlists = useAppSelector(state => state.wishlistReducer.products);
    const dispatch = useAppDispatch();

    const pathname = usePathname();

    const existingInWishlist = wishlists.find(wishlist => wishlist.id === selectedProduct.id);
    const isAddedToWishlist = existingInWishlist !== undefined;

    const wishlistBtnTooltip = useMemo(() => {
        if (!isAddedToWishlist) return 'Add to wishlist';
        return pathname !== '/wishlist' ? 'Browse wishlist' : 'Remove from wishlist';
    }, [isAddedToWishlist, pathname]);

    const handleWishlist = () => {
        if (!isAddedToWishlist) {
            dispatch(addToWishlist(selectedProduct));
        } else {
            dispatch(removeFromWishlist(selectedProduct.id));
        }
    }

    return (
        <div>
            <div className="space-y-2">
                <div className="bg-white">
                    <img src={selectedProduct.image} alt={selectedProduct.title} className="h-[300px] mx-auto object-contain" />
                </div>

                <div className={`${className?.px} space-y-2 text-lg text-accent`}>
                    <p className="text-black">${selectedProduct.price}</p>
                    <ProductRating className="flex" productRating={selectedProduct.rating.rate} />
                    <p className="text-black font-medium">{selectedProduct.title}</p>
                    <p className="text-accent text-base">{selectedProduct.description}</p>
                </div>
            </div>

            <div className={`space-y-5 mt-2 ${className?.px} ${className?.pb}`}>
                <div className="flex gap-1">
                    <Button
                        size='icon'
                        variant='ghost'
                        className="px-2"
                        onClick={() => dispatch(addToCart({ ...selectedProduct, quantity: 1 }))}
                    >
                        <ShoppingCart strokeWidth={1} />
                    </Button>

                    <Button
                        title={wishlistBtnTooltip}
                        size='icon'
                        variant='ghost'
                        className={`${isAddedToWishlist && 'bg-black text-white'} px-2`}
                        onClick={handleWishlist}
                    >
                        <Heart strokeWidth={1} />
                    </Button>
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

                <Button className="w-full">BUY NOW</Button>
            </div>
        </div>
    )
}