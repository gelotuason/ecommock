'use client';

import EditCartProductDialog from './edit-cart-product-dialog';
import RemoveAlertDialog from './remove-alert-dialog';
import { useState } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trash2, Pen } from 'lucide-react';

type CartProductProps = {
    product: Product
    quantity: number
}

export default function CartProduct({ product, quantity }: CartProductProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRemoveAlertDialogOpen, setIsRemoveAlertDialogOpen] = useState(false);

    return (
        <div className='flex gap-3 py-2'>
            <img src={product.image} alt={product.title} className='size-20 my-auto' />

            <div className='flex-1 space-y-1'>
                <p className='font-semibold'>{product.title}</p>
                <p>${product.price}</p>
                <p className='text-accent'>Quantity: {quantity}</p>
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
                product={product}
                quantity={quantity}
            />

            <RemoveAlertDialog
                isRemoveAlertDialogOpen={isRemoveAlertDialogOpen}
                setIsRemoveAlertDialogOpen={setIsRemoveAlertDialogOpen}
                setIsEditDialogOpen={setIsEditDialogOpen}
                product={product}
            />
        </div>
    )
}