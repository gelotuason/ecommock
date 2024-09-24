import Link from "next/link";
import { Products } from "@/lib/types";
import { ShoppingCart, Heart, Search } from "lucide-react";

export default async function ProductList({ category }: { category?: string }) {
    // TODO: generate stars

    let products: Products[] | null = null;
    let error: string | null = null;

    try {
        const res = await fetch('https://fakestoreapi.com/products/');
        const data: Products[] = await res.json();

        if (!res.ok) throw new Error('Failed to fetch products');

        if (category) {
            const filteredProducts = data.filter(data => data.category === decodeURIComponent(category));

            products = filteredProducts;
        } else {
            products = data; // displays all products
        }
    } catch (err) {
        if (err instanceof Error) {
            error = err.message;
        }

        console.error(err);
    }

    if (!products) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 py-8">
            {products.map((product) => (
                <div key={product.id}>
                    <Link
                        href='/'
                        className="bg-white shadow-sm flex bg-center bg-no-repeat h-36 bg-contain"
                        style={{
                            backgroundImage: `url('${product.image}')`,
                        }}
                    >
                        <div className="relative w-max mx-auto flex items-end h-full pb-2">
                            <div className="bg-[#f5f5f5] rounded flex items-center divide-x shadow-lg">
                                <button className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                                    <ShoppingCart size={20} strokeWidth={1} />
                                </button>
                                <button className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                                    <Heart size={20} strokeWidth={1} />
                                </button>
                                <button className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                                    <Search size={20} strokeWidth={1} />
                                </button>
                            </div>
                        </div>
                    </Link>

                    <div className="px-1 mt-2 text-sm">
                        {/* <div className="flex justify-center">
                                        {Array.from({ length: 5 }).map(star => (
                                            <Star fill="black" size={16} />
                                            ))}
                                            </div> */}
                        <p className="font-medium">${product.price}</p>
                        <p>{product.rating.rate}</p>
                        <p className="font-medium">{product.title}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}