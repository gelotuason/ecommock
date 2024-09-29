import Link from "next/link";
import { X, ChevronRight, Heart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose, DrawerTrigger } from "../ui/drawer";

type MenuDrawerProps = {
    isOpen: boolean
    setIsOpen: () => void
}

export default function MenuDrawer({ isOpen, setIsOpen }: MenuDrawerProps) {
    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen} direction='left'>
            <DrawerContent className='h-screen md:w-1/4 rounded-none border-none bg-secondary'>
                <DrawerHeader className='flex justify-between items-center bg-primary text-secondary'>
                    <DrawerTitle>Menu</DrawerTitle>
                    <DrawerDescription className='sr-only' />
                    <DrawerClose>
                        <X strokeWidth={1} />
                    </DrawerClose>
                </DrawerHeader>
                <DrawerDescription className='flex flex-col gap-8 px-6'>
                    <div className="">
                        <Button asChild variant="ghost" className='w-full border-b rounded-none flex justify-between py-6'>
                            <Link href='/' onClick={setIsOpen}>
                                Home
                                <ChevronRight strokeWidth={0.5} />
                            </Link>
                        </Button>
                        <Button asChild variant="ghost" className='w-full border-b rounded-none flex justify-between py-6'>
                            <Link href='/shop' onClick={setIsOpen}>
                                Shop
                                <ChevronRight strokeWidth={0.5} />
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Button variant='ghost' asChild className='w-full border-b rounded-none flex justify-start gap-4 py-6'>
                            <Link href='/' onClick={setIsOpen}>
                                <Heart strokeWidth={1} size={20} />
                                Wishlist
                            </Link>
                        </Button>
                        <Button variant='ghost' asChild className='w-full border-b rounded-none flex justify-start gap-4 py-6'>
                            <Link href='/' onClick={setIsOpen}>
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