'use client';

import ProductRating from "@/components/product/product-rating";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/lib/types";
import { Heart, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/lib/hooks";
import { addToCartAsync } from "@/lib/features/cart/cartThunks";

type ProductDetailProps = {
    open: boolean
    onOpenChange: Dispatch<SetStateAction<boolean>>
    product: Product
}

export default function ProductDetail({ open, onOpenChange, product }: ProductDetailProps) {
    const dispatch = useAppDispatch();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90%] max-w-[90%] bg-white overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle className="sr-only"></DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                    <img src={product.image} alt={product.title} className="h-[200px] mx-auto" />

                    <div className="px-1 space-y-1 text-sm text-accent">
                        <p className="text-black">${product.price}</p>
                        <ProductRating className="flex" productRating={product.rating.rate} />
                        <p className="text-black font-medium">{product.title}</p>
                        <p className="text-accent">{product.description}</p>
                    </div>
                </div>

                {/* action bar */}
                <div className="space-y-5">
                    <div className="flex gap-1">
                        <Button
                            size='icon'
                            variant='ghost'
                            className="px-2"
                            onClick={() => dispatch(addToCartAsync({ product, quantity: 1 }))}
                        >
                            <ShoppingCart strokeWidth={1} />
                        </Button>

                        <Button size='icon' variant='ghost' className="px-2">
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