'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, X, Minus, Plus, Trash2, } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFromCart, incrementQuantity, decrementQuantity } from '@/lib/features/cart/cartSlice';

export default function Cart() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.cartReducer.products);

    return (
        <Drawer direction='right'>
            <DrawerTrigger className='relative'>
                <ShoppingCart strokeWidth={1} />
                {products && <small className='absolute -top-1 -right-2 rounded-full w-4 bg-black text-white text-xs'>{products.length}</small>}
            </DrawerTrigger>
            <DrawerContent className='h-screen border-none bg-secondary rounded-none'>
                <DrawerHeader className='flex justify-between items-center'>
                    <DrawerTitle className='text-2xl'>Cart {products && `(${products.length})`} </DrawerTitle>
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>

                <DrawerDescription className='sr-only'></DrawerDescription>

                <div className='divide-y px-4 overflow-auto'>
                    {products && products.map(products => {
                        const { product, quantity } = products;

                        return (
                            <div key={product.id} className='flex gap-3 py-2'>
                                <img src={product.image} alt={product.title} className='size-24 my-auto' />

                                {/* cart product details */}
                                <div className='flex-1 space-y-1'>
                                    <p className='text-black'>{product.title}</p>
                                    <p>${product.price}</p>
                                    <div className='relative w-3/4'>
                                        <Input
                                            name='quantity'
                                            type='text'
                                            className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            value={quantity}
                                            disabled
                                        />
                                        <Button
                                            variant='ghost'
                                            className='px-3 absolute inset-y-0 left-0'
                                            onClick={() => dispatch(decrementQuantity(product.id))}
                                        >
                                            <Minus size={12} strokeWidth={1} />
                                        </Button>
                                        <Button
                                            variant='ghost'
                                            className='px-3 absolute inset-y-0 right-0'
                                            onClick={() => dispatch(incrementQuantity(product.id))}
                                        >
                                            <Plus size={12} strokeWidth={1} />
                                        </Button>
                                    </div>
                                </div>
                                {/* end of cart product details */}

                                {/* delete cart product button */}
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='w-max h-max px-1 py-1'
                                    onClick={() => dispatch(removeFromCart(product.id))}
                                >
                                    <Trash2 size={16} strokeWidth={1} />
                                </Button>
                                {/* end of delete cart product button */}
                            </div>
                        )
                    })}
                </div>
                <DrawerFooter>
                    <Button variant='outline'>More results</Button>
                    <Button variant='default'>Checkout</Button>
                </DrawerFooter>
            </DrawerContent >
        </Drawer >
    )
}