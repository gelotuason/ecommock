'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Heart, Menu, ChevronRight, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";

export default function NavMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen} direction='left'>
            <DrawerTrigger>
                <Menu strokeWidth={1} />
            </DrawerTrigger>
            <DrawerContent className='h-screen md:w-1/4 rounded-none border-none bg-secondary'>
                <DrawerHeader className='flex justify-between items-center bg-primary text-secondary'>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription className='sr-only' />
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>
                <DrawerDescription className='flex flex-col gap-8 px-6'>
                    <div>
                        <Button asChild variant="ghost" className='w-full border-b rounded-none flex justify-between py-6'>
                            <Link href='/' onClick={() => setIsMenuOpen(false)}>
                                Home
                                <ChevronRight strokeWidth={0.5} />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" className='w-full border-b rounded-none flex justify-between py-6'>
                            <Link href='/shop' onClick={() => setIsMenuOpen(false)}>
                                Shop
                                <ChevronRight strokeWidth={0.5} />
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button variant='ghost' asChild className='w-full border-b rounded-none flex justify-start gap-4 py-6'>
                            <Link href='/' onClick={() => setIsMenuOpen(false)}>
                                <Heart strokeWidth={1} size={20} />
                                Wishlist
                            </Link>
                        </Button>
                        <Button variant='ghost' asChild className='w-full border-b rounded-none flex justify-start gap-4 py-6'>
                            <Link href='/' onClick={() => setIsMenuOpen(false)}>
                                <User strokeWidth={1} />
                                Login
                            </Link>
                        </Button>
                    </div>
                </DrawerDescription>
            </DrawerContent>
        </Drawer>
    )
}