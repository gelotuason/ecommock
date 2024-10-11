'use client';

import ProductRating from "@/components/product/product-rating";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Heart, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { addToWishlist } from "@/lib/features/wishlist/wishlistSlice";

type ProductDetailProps = {
    open: boolean
    onOpenChange: Dispatch<SetStateAction<boolean>>
    selectedProduct: Product
}

export default function ProductQuickView({ open, onOpenChange, selectedProduct }: ProductDetailProps) {
    const wishlists = useAppSelector(state => state.wishlistReducer.products);
    const dispatch = useAppDispatch();

    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
    const [wishlistBtnTooltip, setWishlistBtnTooltip] = useState('');

    const pathname = usePathname();
    const router = useRouter();

    const existingInWishlist = wishlists.find(wishlist => wishlist.id === selectedProduct.id);

    const handleWishlist = () => {
        if (!isAddedToWishlist) {
            dispatch(addToWishlist(selectedProduct));
        } else {
            onOpenChange(!open);
            router.push('/wishlist');
        }
    }

    useEffect(() => {
        if (existingInWishlist !== undefined) {
            setIsAddedToWishlist(true);
            setWishlistBtnTooltip('Browse wishlist');
        } else {
            setIsAddedToWishlist(false);
            setWishlistBtnTooltip('Add to wishlist');
        }
    }, [existingInWishlist, pathname]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90%] max-w-[90%] bg-white overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle className="sr-only"></DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                    <img src={selectedProduct.image} alt={selectedProduct.title} className="h-[200px] mx-auto object-contain" />

                    <div className="px-1 space-y-1 text-sm text-accent">
                        <p className="text-black">${selectedProduct.price}</p>
                        <ProductRating className="flex" productRating={selectedProduct.rating.rate} />
                        <p className="text-black font-medium">{selectedProduct.title}</p>
                        <p className="text-accent">{selectedProduct.description}</p>
                    </div>
                </div>

                {/* action bar */}
                <div className="space-y-5">
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
                {/* end of action bar */}
            </DialogContent>
        </Dialog >
    )
}