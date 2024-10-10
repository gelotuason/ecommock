'use client';

import ProductDetail from "./product-detail";
import ProductRating from "@/components/product/product-rating";
import { ShoppingCart, Heart, Search, X } from "lucide-react";
import { Product } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
    const wishlists = useAppSelector(state => state.wishlistReducer.products);
    const dispatch = useAppDispatch();

    const [productDetailDialog, toggleProductDetailDialog] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    const [wishlistBtnTooltip, setWishlistBtnTooltip] = useState('');

    const pathname = usePathname();
    const router = useRouter();

    const existingInWishlist = wishlists.find(wishlist => wishlist.id === product.id);

    const handleWishlist = () => {
        if (!isAddedToWishlist) {
            dispatch(addToWishlist(product));
        } else if (pathname === '/wishlist') {
            dispatch(removeFromWishlist(product.id));
        } else {
            router.push('/wishlist');
        }
    }

    useEffect(() => {
        if (existingInWishlist !== undefined) {
            setIsAddedToWishlist(true);

            if (pathname !== '/wishlist') {
                setWishlistBtnTooltip('Browse wishlist');
            } else {
                setWishlistBtnTooltip('Remove from wishlist');
            }
        } else {
            setIsAddedToWishlist(false);
            setWishlistBtnTooltip('Add to wishlist');
        }
    }, [existingInWishlist, pathname]);

    return (
        <div>
            <div className="relative">
                <div className="bg-white">
                    <img src={product.image} alt={product.title} className="h-[128px] mx-auto object-contain" />
                </div>
                <div className="absolute inset-x-0 bottom-2">
                    <div className="bg-[#f5f5f5] rounded flex items-center w-max divide-x shadow-lg mx-auto">
                        <button
                            title="Add to cart"
                            className='hover:bg-black hover:rounded-s hover:text-white transition-all duration-300 p-1'
                            onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                        >
                            <ShoppingCart size={20} strokeWidth={1} />
                        </button>
                        <button
                            title={wishlistBtnTooltip}
                            className={`${isAddedToWishlist
                                ? pathname === '/wishlist' ? 'hover:bg-black hover:text-white transition-all duration-300' : 'bg-black text-white'
                                : 'hover:bg-black hover:text-white transition-all duration-300'}
                                p-1`}
                            onClick={handleWishlist}
                        >
                            {pathname === '/wishlist' ? <X size={20} strokeWidth={1} /> : <Heart size={20} strokeWidth={1} />}

                        </button>
                        <button
                            title="Quick view"
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

            <ProductDetail open={productDetailDialog} onOpenChange={toggleProductDetailDialog} selectedProduct={product} />
        </div>
    )
}