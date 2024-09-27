'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, X, Minus, Plus, Trash2, } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";
import { useAppSelector } from '@/lib/hooks';

export default function Cart() {
    const products = useAppSelector(state => state.cartReducer.products);

    return (
        <Drawer direction='right'>
            <DrawerTrigger>
                <div className='relative'>
                    <ShoppingCart strokeWidth={1} />
                    {products && <div className='absolute -top-1 -right-2 rounded-full w-4 bg-black text-white text-xs'>{products.length}</div>}
                </div>
            </DrawerTrigger>
            <DrawerContent className='h-screen border-none bg-secondary rounded-none'>
                <DrawerHeader className='flex justify-between items-center'>
                    <DrawerTitle className='text-2xl'>Cart (0)</DrawerTitle>
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>

                <DrawerDescription className='divide-y px-4 overflow-auto'>
                    {products && products.map(products => {
                        const { product, quantity } = products;

                        return (
                            <div className='flex gap-3 py-2'>
                                <img src={product.image} alt={product.title} className='size-24 my-auto' />

                                {/* cart product details */}
                                <div className='flex-1 space-y-1'>
                                    <p className='text-black'>{product.title}</p>
                                    <p>${product.price}</p>
                                    <div className='relative w-3/4'>
                                        <Input
                                            type='number'
                                            className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            min={0}
                                            value={quantity}
                                        />
                                        {/* <div className='absolute inset-y-0 h-full'>test</div> */}
                                        <Button variant='ghost' className='px-3 absolute inset-y-0 left-0'>
                                            <Minus size={12} strokeWidth={1} />
                                        </Button>
                                        <Button variant='ghost' className='px-3 absolute inset-y-0 right-0'>
                                            <Plus size={12} strokeWidth={1} />
                                        </Button>
                                    </div>
                                </div>
                                {/* end of cart product details */}

                                {/* delete cart product button */}
                                <Button variant='ghost' size='icon' className='w-max h-max px-1 py-1'>
                                    <Trash2 size={16} strokeWidth={1} />
                                </Button>
                                {/* end of delete cart product button */}
                            </div>
                        )
                    })}
                </DrawerDescription>
                <DrawerFooter>
                    <Button variant='outline'>More results</Button>
                    <Button variant='default'>Checkout</Button>
                </DrawerFooter>
            </DrawerContent >
        </Drawer >
    )
}