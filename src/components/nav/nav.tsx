'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuDrawer from '@/components/nav/menu-drawer';
import Search from '@/components/search/search-drawer';
import CartDrawer from '@/components/cart/cart-drawer';
import { Menu, SearchIcon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks';
import { useDrawerState } from '@/hooks/use-drawer-state';

export default function Nav() {
    const cartProducts = useAppSelector(state => state.cartReducer.products);

    const [menuDrawer, toggleMenuDrawer] = useDrawerState();
    const [searchDrawer, toggleSearchDrawer] = useDrawerState();
    const [cartDrawer, toggleCartDrawer] = useDrawerState();

    const pathname = usePathname();

    return (
        <nav className='flex justify-between items-center px-4 py-3 border border-b bg-white'>
            <Button size='icon' variant='link' title='Menu' onClick={toggleMenuDrawer}>
                <Menu strokeWidth={1} />
            </Button>

            <Link href='/' className='text-xl flex-1 text-center'>
                <h1>ecommock.</h1>
            </Link>

            <div className='flex gap-1'>
                <Button size='icon' variant='link' title='Search' onClick={toggleSearchDrawer}>
                    <SearchIcon strokeWidth={1} />
                </Button>
                {pathname !== '/cart'
                    ? <Button size='icon' variant='link' className='relative' title='Cart' onClick={toggleCartDrawer}>
                        <ShoppingCart strokeWidth={1} />
                        {cartProducts && <small className='absolute top-0 -right-1 rounded-full w-5 bg-black text-white text-sm font-normal'>{cartProducts.length}</small>}
                    </Button>
                    : <Button size='icon' variant='link' title='Cart' asChild>
                        <Link href='/cart' className='relative'>
                            <ShoppingCart strokeWidth={1} />
                            {cartProducts && <small className='absolute top-0 -right-1 rounded-full w-5 text-center bg-black text-white text-sm font-normal'>{cartProducts.length}</small>}
                        </Link>
                    </Button>}
            </div>

            <MenuDrawer isOpen={menuDrawer} setIsOpen={toggleMenuDrawer} />
            <Search isOpen={searchDrawer} setIsOpen={toggleSearchDrawer} />
            <CartDrawer isOpen={cartDrawer} setIsOpen={toggleCartDrawer} />
        </nav>
    )
}