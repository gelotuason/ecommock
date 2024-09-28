import Link from 'next/link';
import Search from '@/components/search';
import NavMenu from '@/components/nav-menu';
import CartDrawer from '@/components/cart/cart-drawer';

export default function Nav() {
    // TODO: make reusable custom drawer

    return (
        <nav className='flex justify-between items-center px-4 py-3'>
            <NavMenu />

            <Link href='/' className='text-xl'>ecommock.</Link>

            <div className='flex gap-2'>
                <Search />
                <CartDrawer />
            </div>
        </nav>
    )
}