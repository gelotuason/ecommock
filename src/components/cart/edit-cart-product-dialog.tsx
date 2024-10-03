'use client';

import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartProduct, decrementQty, incrementQty } from "@/lib/features/cart/cartSlice";

type EditCartProductDialogProps = {
    open: boolean
    onOpenChange: Dispatch<SetStateAction<boolean>>
    product: Product
    quantity: number
}

export default function EditCartProductDialog({ open, onOpenChange, product, quantity }: EditCartProductDialogProps) {
    const { products } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const selectedProduct = products.find(cartProduct => cartProduct.product.id === product.id);

    const handleUpdateProduct = () => {
        if (selectedProduct) {
            dispatch(updateCartProduct({ product, quantity: selectedProduct.quantity }));
            onOpenChange(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-5/6">
                <DialogHeader>
                    <DialogTitle className="text-start">Edit option</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>

                <div className="flex gap-3">
                    <img src={product.image} alt={product.title} className='size-20 my-auto' />

                    <div className='flex-1 space-y-1'>
                        <p className='font-semibold'>{product.title}</p>
                        <p>${product.price}</p>
                    </div>
                </div>

                <div className='relative'>
                    <Input
                        name='quantity'
                        type='text'
                        className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        value={quantity}
                        readOnly
                    />
                    <Button
                        variant='ghost'
                        className='px-3 absolute inset-y-0 left-0'
                        onClick={() => dispatch(decrementQty(product.id))}
                    >
                        <Minus size={12} strokeWidth={1} />
                    </Button>
                    <Button
                        variant='ghost'
                        className='px-3 absolute inset-y-0 right-0'
                        onClick={() => dispatch(incrementQty(product.id))}
                    >
                        <Plus size={12} strokeWidth={1} />
                    </Button>
                </div>

                <Button onClick={handleUpdateProduct}>SUBMIT</Button>
            </DialogContent>
        </Dialog >
    )
}