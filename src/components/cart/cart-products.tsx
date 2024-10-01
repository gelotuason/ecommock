'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';
import { Minus, Plus, Trash2, } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { incrementQty, decrementQty, setRemoveAlert } from '@/lib/features/cart/cartSlice';

export default function CartProducts() {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.cartReducer);

    const handleRemove = (product: Product) => {
        dispatch(setRemoveAlert({ productId: product.id, productName: product.title }));
    }

    return (
        <div className='divide-y px-4 overflow-auto'>
            {products && products.map(cartProduct => {
                const { product, quantity } = cartProduct;

                return (
                    <div key={product.id} className='flex gap-3 py-2'>
                        <img src={product.image} alt={product.title} className='size-24 my-auto' />

                        <div className='flex-1 space-y-1'>
                            <p className='font-semibold'>{product.title}</p>
                            <p>${product.price}</p>
                            <div className='relative w-3/4'>
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
                        </div>

                        {/* remove cart item */}
                        <Button
                            variant='ghost'
                            size='icon'
                            className='w-max h-max px-1 py-1'
                            onClick={() => handleRemove(product)}
                        >
                            <Trash2 size={16} strokeWidth={1} />
                        </Button>
                        {/* end of remove cart item */}
                    </div>
                )
            })}
        </div>
    )
}