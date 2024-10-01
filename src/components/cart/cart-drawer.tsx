'use client';

import Alert from '@/components/cart/alert';
import CartProducts from './cart-products';
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

                <CartProducts />

                <DrawerFooter>
                    <Button variant='outline'>More results</Button>
                    <Button variant='default'>Checkout</Button>
                </DrawerFooter>
            </DrawerContent>

            <Alert />
        </Drawer >
    )
}