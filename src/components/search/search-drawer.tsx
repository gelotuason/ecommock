'use client';

import Link from 'next/link';
import CategoryLinks from '@/components/category-links';
import ProductRating from '@/components/product/product-rating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { searchUpdated } from '@/lib/features/search/searchSlice';

type SearchDrawerProps = {
	isOpen: boolean
	setIsOpen: () => void
}

export default function SearchDrawer({ isOpen, setIsOpen }: SearchDrawerProps) {
	// TODO: search functionality
	// TODO: add more results button (when user searched)
	// TODO: add searched product listing
	const { search, products } = useAppSelector(state => state.searchReducer)
	const dispatch = useAppDispatch();

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen} direction='top'>
			<DrawerContent className='mt-0 top-0 border-none bg-secondary rounded-none overflow-auto'>
				<DrawerHeader>
					<div className='relative'>
						<DrawerTitle className='text-2xl text-center'>Search</DrawerTitle>
						<DrawerClose className='absolute top-0 right-0'>
							<X strokeWidth={1} />
						</DrawerClose>
					</div>
				</DrawerHeader>
				<DrawerDescription className='sr-only'></DrawerDescription>
				<div className='space-y-4 px-4 py-2'>
					<div className='relative'>
						<Input
							type='text'
							className='border-accent p-5'
							placeholder='Search products'
							value={search}
							onChange={(e) => dispatch(searchUpdated(e.target.value))}
						/>
						<SearchIcon strokeWidth={1} className='absolute inset-y-0 right-2 h-full' />
					</div>

					<div className='space-y-1 text-center'>
						<p className='text-lg'>Quick Search:</p>
						<CategoryLinks onClick={() => setIsOpen()} wrapperClassName='divide-x-2' linkClassName='px-2 text-sm' />
					</div>

					{products && search
						&& <>
							<p className='text-2xl mb-4 text-center text-accent py-4'>Search for "<span className='text-black'>{search}</span>"</p>
							<div className='grid grid-cols-2 gap-x-3 gap-y-8'>
								{products.map(product => (
									<Link key={product.id} href='/' onClick={() => setIsOpen()}>
										<div className='bg-white'>
											<img src={product.image} alt={product.title} className="h-[128px] object-contain mx-auto" />
										</div>
										<div className="mt-2 px-1 space-y-1 text-sm">
											<p>${product.price}</p>
											<ProductRating className="text-accent flex" productRating={product.rating.rate} />
											<p className="font-medium">{product.title}</p>
										</div>
									</Link>
								))}
							</div>
						</>}
				</div>
				<DrawerFooter className='sr-only'>
					<Button>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer >
	)
}