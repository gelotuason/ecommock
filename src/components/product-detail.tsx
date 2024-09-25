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
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react";


export default function ProductDetail({ productId }: { productId?: number }) {
    // TODO: loading state
    // TODO: improve error state

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getProductById() {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
                const data = await res.json();

                if (!res.ok) throw new Error('Failed to fetch product.');

                setProduct(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }

                console.error(err);
            }
        }

        getProductById();
    }, []);

    if (error) return <div>{error}</div>

    return (
        <Dialog>
            <DialogTrigger className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                <Search size={20} strokeWidth={1} />
            </DialogTrigger>
            <DialogContent className="w-5/6 h-5/6 bg-white gap-y-4 overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle className="sr-only">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>
                <img src={product?.image} alt={product?.title} className="h-[200px] mx-auto" />

                <div className="mt-2 px-1 space-y-1 text-sm">
                    <p className="text-black">${product?.price}</p>
                    <p className="text-accent">{product?.rating.rate} rating</p>
                    <p className="text-black font-medium">{product?.title}</p>
                    <p className="text-accent">{product?.description}</p>
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
                        <Button size='icon' variant='ghost' className="px-2">
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