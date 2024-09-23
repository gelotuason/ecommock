import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, X, Minus, Plus, Trash2, } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";

export default function CartDrawer() {
    return (
        <Drawer direction='right'>
            <DrawerTrigger>
                <ShoppingCart strokeWidth={1} />
            </DrawerTrigger>
            <DrawerContent className='h-screen border-none bg-secondary rounded-none'>
                <DrawerHeader className='flex justify-between items-center'>
                    <DrawerTitle className='text-2xl'>Cart (0)</DrawerTitle>
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>

                <DrawerDescription className='divide-y px-4 overflow-auto'>
                    {/* product 1 */}
                    <div className='flex gap-2 py-2'>
                        {/* product image */}
                        <div className='relative h-24 w-24 my-auto'>
                            <Image
                                src='/slides-img-3.jpg'
                                fill
                                alt='Cart product'
                            />
                        </div>
                        {/* end of product image */}

                        {/* cart product details */}
                        <div className='space-y-2'>
                            <p className='text-lg text-black'>Title</p>
                            <p className='text-base'>$36.00</p>
                            <div className='relative w-3/4'>
                                <Input type='number' className='text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' min={0} defaultValue={1} />
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
                    {/* end of product 1 */}
                </DrawerDescription>
                <DrawerFooter className=''>
                    <Button variant='outline'>More results</Button>
                    <Button variant='default'>Checkout</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}