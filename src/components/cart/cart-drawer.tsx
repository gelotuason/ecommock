'use client';

import CartProduct from '@/components/cart/cart-product';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";
import { useAppSelector } from '@/lib/hooks';

type CartDrawerProps = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function CartDrawer({ isOpen, setIsOpen }: CartDrawerProps) {
    const { products } = useAppSelector(state => state.cartReducer);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
            <DrawerContent className='h-screen border-none bg-secondary rounded-none'>
                <DrawerHeader className='flex justify-between items-center'>
                    <DrawerTitle className='text-2xl'>Cart {`(${products.length})`} </DrawerTitle>
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>
                <DrawerDescription className='sr-only'></DrawerDescription>

                <div className='divide-y px-4 overflow-auto'>
                    {products && products.map((cartProduct, index) => (
                        <CartProduct key={index} product={cartProduct.product} quantity={cartProduct.quantity} />
                    ))}
                </div>

                <DrawerFooter>
                    <Button variant='outline'>More results</Button>
                    <Button variant='default'>Checkout</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer >
    )
}