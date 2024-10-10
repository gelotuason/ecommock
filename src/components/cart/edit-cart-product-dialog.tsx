'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CartProduct } from "@/lib/features/cart/cartSlice";
import { updateCartProduct } from "@/lib/features/cart/cartSlice";

type EditCartProductDialogProps = {
    isEditDialogOpen: boolean
    setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>
    setIsRemoveAlertDialogOpen: Dispatch<SetStateAction<boolean>>
    selectedProduct: CartProduct
}

export default function EditCartProductDialog({ isEditDialogOpen, setIsEditDialogOpen, setIsRemoveAlertDialogOpen, selectedProduct }: EditCartProductDialogProps) {
    const { products } = useAppSelector(state => state.cartReducer);
    const dispatch = useAppDispatch();

    const [newQuantity, setNewQuantity] = useState(selectedProduct.quantity);

    const handleUpdateProduct = async () => {
        const existingProduct = products.find(cartProduct => cartProduct.id === selectedProduct.id);

        if (!existingProduct) return;

        try {
            await dispatch(updateCartProduct({
                ...existingProduct,
                quantity: newQuantity
            })).unwrap();

            setIsEditDialogOpen(false);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDecrement = () => {
        if (newQuantity === 1) {
            setIsRemoveAlertDialogOpen(true);
        } else {
            setNewQuantity(newQuantity - 1);
        }
    }

    const handleIncrement = () => setNewQuantity(newQuantity + 1);

    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="w-5/6">
                <DialogHeader>
                    <DialogTitle className="text-start">Edit option</DialogTitle>
                    <DialogDescription className="sr-only"></DialogDescription>
                </DialogHeader>

                <div className="flex gap-3">
                    <img src={selectedProduct.image} alt={selectedProduct.title} className='size-20 my-auto object-contain' />

                    <div className='flex-1 space-y-1'>
                        <p className='font-semibold'>{selectedProduct.title}</p>
                        <p>${selectedProduct.price}</p>
                    </div>
                </div>

                <div className='relative'>
                    <Input
                        name='quantity'
                        type='text'
                        className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        value={newQuantity}
                        readOnly
                    />
                    <Button
                        variant='ghost'
                        className='px-3 absolute inset-y-0 left-0'
                        onClick={handleDecrement}
                    >
                        <Minus size={12} strokeWidth={1} />
                    </Button>
                    <Button
                        variant='ghost'
                        className='px-3 absolute inset-y-0 right-0'
                        onClick={handleIncrement}
                    >
                        <Plus size={12} strokeWidth={1} />
                    </Button>
                </div>

                <Button onClick={handleUpdateProduct}>SUBMIT</Button>
            </DialogContent>
        </Dialog >
    )
}