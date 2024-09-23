import Link from 'next/link';
import SearchDrawer from './search-drawer';
import NavMenu from './nav-menu';
import CartDrawer from './cart-drawer';

export default function Nav() {
    // TODO: make reusable custom drawer

    return (
        <nav className='flex justify-between items-center py-2 px-3'>
            <NavMenu />

            <Link href='/' className='text-xl'>ecommock.</Link>

            <div className='flex gap-2'>
                <SearchDrawer />
                <CartDrawer />
            </div>
        </nav>
    )
}