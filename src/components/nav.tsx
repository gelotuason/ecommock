import Link from 'next/link';
import Search from '@/components/search';
import NavMenu from '@/components/nav-menu';
import Cart from '@/components/cart';

export default function Nav() {
    // TODO: make reusable custom drawer

    return (
        <nav className='flex justify-between items-center py-2 px-3'>
            <NavMenu />

            <Link href='/' className='text-xl'>ecommock.</Link>

            <div className='flex gap-2'>
                <Search />
                <Cart />
            </div>
        </nav>
    )
}