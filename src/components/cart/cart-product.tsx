'use client';

import EditCartProductDialog from './edit-cart-product-dialog';
import RemoveAlertDialog from './remove-alert-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Pen } from 'lucide-react';
import { CartProduct as CartProductType } from '@/lib/features/cart/cartSlice';

export default function CartProduct({ ...cartProduct }: CartProductType) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRemoveAlertDialogOpen, setIsRemoveAlertDialogOpen] = useState(false);

    return (
        <div className='flex gap-3 py-2'>
            <img src={cartProduct.image} alt={cartProduct.title} className='size-20 my-auto object-contain' />

            <div className='flex-1 space-y-1'>
                <p className='font-semibold'>{cartProduct.title}</p>
                <p>${cartProduct.price}</p>
                <p className='text-accent'>Quantity: {cartProduct.quantity}</p>
            </div>


            <div className='flex flex-col'>
                {/* remove button - displays confirmation first when clicked */}
                <Button
                    variant='ghost'
                    size='icon'
                    className='w-max h-max px-1 py-1'
                    onClick={() => setIsRemoveAlertDialogOpen(true)}
                >
                    <Trash2 size={16} strokeWidth={1} />
                </Button>

                {/* edit button */}
                <Button
                    variant='ghost'
                    size='icon'
                    className='w-max h-max px-1 py-1'
                    onClick={() => setIsEditDialogOpen(true)}
                >
                    <Pen size={16} strokeWidth={1} />
                </Button>
            </div>

            <EditCartProductDialog
                isEditDialogOpen={isEditDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                setIsRemoveAlertDialogOpen={setIsRemoveAlertDialogOpen}
                selectedProduct={cartProduct}
            />

            <RemoveAlertDialog
                isRemoveAlertDialogOpen={isRemoveAlertDialogOpen}
                setIsRemoveAlertDialogOpen={setIsRemoveAlertDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                selectedProduct={cartProduct}
            />
        </div>
    )
}