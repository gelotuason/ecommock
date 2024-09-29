'use client';

import { Product } from "@/lib/types";
import { Heart, Minus, Plus, Search, ShoppingCart } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/features/cart/cartSlice";

export default function ProductDetail({ product }: { product: Product }) {
    const dispatch = useAppDispatch();

    return (
        <Dialog>
            <DialogTrigger className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                <Search size={20} strokeWidth={1} />
            </DialogTrigger>
            <DialogContent className="max-h-[90%] max-w-[90%] bg-white overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle className="sr-only">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>
                <div className="space-y-1">
                    <img src={product.image} alt={product.title} className="h-[200px] mx-auto" />

                    <div className="px-1 space-y-1 text-sm">
                        <p className="text-black">${product.price}</p>
                        <p className="text-accent">{product.rating.rate} rating</p>
                        <p className="text-black font-medium">{product.title}</p>
                        <p className="text-accent">{product.description}</p>
                    </div>
                </div>

                {/* action bar */}
                <div className="space-y-5">
                    <div className="flex gap-1">
                        {/* set quantity */}
                        <div className='relative w-full'>
                            <Input type='number' className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' min={0} defaultValue={1} />
                            <Button variant='ghost' className='px-3 absolute inset-y-0 left-0'>
                                <Minus size={16} strokeWidth={1} />
                            </Button>
                            <Button variant='ghost' className='px-3 absolute inset-y-0 right-0'>
                                <Plus size={16} strokeWidth={1} />
                            </Button>
                        </div>
                        {/* end of set quantity */}

                        {/* add to cart */}
                        <Button
                            size='icon'
                            variant='ghost'
                            className="px-2"
                            onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
                        >
                            <ShoppingCart strokeWidth={1} />
                        </Button>
                        {/* end of add to cart */}

                        {/* add to wishlist */}
                        <Button size='icon' variant='ghost' className="px-2">
                            <Heart strokeWidth={1} />
                        </Button>
                        {/* end of add to wishlist */}
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