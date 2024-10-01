import Link from 'next/link';
import Image from 'next/image';
import CategoryLinks from '../category-links';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, X, Star } from 'lucide-react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer";

type SearchDrawerProps = {
	isOpen: boolean
	setIsOpen: () => void
}

export default function SearchDrawer({ isOpen, setIsOpen }: SearchDrawerProps) {
	// TODO: search functionality
	// TODO: add more results button (when user searched)
	// TODO: add searched product listing

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
				<div className='space-y-4 px-4 text-center py-2'>
					{/* search input */}
					<div className='relative'>
						<Input type='text' className='border-accent p-5' placeholder='Search products' />
						<SearchIcon strokeWidth={1} className='absolute inset-y-0 right-2 h-full' />
					</div>
					{/* end of search input */}

					{/* quick search categories */}
					<div className='space-y-1'>
						<p className='text-lg'>Quick Search:</p>
						<CategoryLinks wrapperClassName='divide-x-2' linkClassName='px-2 text-sm' />
					</div>
					{/* end of quick search categories */}

					<div className='grid grid-cols-2 gap-x-2 gap-y-4 py-4'>
						{/* product 1 */}
						<div>
							{/* product image */}
							<div className="relative h-[120px] mb-2 py-2">
								<Link
									href='/'
									className=""
								>
									<Image
										src='/slides-img-3.jpg'
										fill
										alt="Best Seller 1"
										className="object-cover"
									/>
								</Link>
							</div>
							{/* end of product image */}

							{/* product details */}
							<div>
								<p className="text-lg">title</p>
								<div className="flex justify-center">
									{Array.from({ length: 5 }).map((_, index) => (
										<Star key={index} fill="black" size={16} />
									))}
								</div>
								<p className="text-lg">$36.00</p>
							</div>
							{/* end of product details */}
						</div>
						{/* end of product 1 */}
					</div>
				</div>
				<DrawerFooter className='sr-only'>
					<Button>Submit</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer >
	)
}