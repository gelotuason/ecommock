import Collections from "@/components/collections";
import ShopControlBar from "@/components/shop-control-bar";
import ProductCard from "@/components/product/product-card";
import { categoriesStaticData } from "@/lib/static";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Product } from "@/lib/types";

async function getProducts() {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/`);
        const data: Product[] = await res.json();

        if (!res.ok) throw new Error(`Failed to fetch data. Status: ${res.status}`);

        return data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch data.')
    }
}

export default async function Shop() {
    // TODO: error and loading states

    const products: Product[] = await getProducts();

    return (
        <main>
            <section
                className="bg-cover bg-no-repeat bg-center h-32 flex flex-col justify-center items-center text-white relative"
                style={{
                    backgroundImage: `url('${categoriesStaticData[4].imgSrc}')`,
                }}
            >
                <h1 className="font-semibold text-3xl">Shop</h1>
                <Breadcrumb>
                    <BreadcrumbList className="text-white/60">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Shop</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <small className='text-white/60 font-light bottom-1 right-1 absolute'>Photo by {categoriesStaticData[4].credit} on Unsplash.</small>
            </section>

            <Collections />

            <section className="px-4 py-10">
                <ShopControlBar />

                <div className="grid grid-cols-2 gap-x-3 gap-y-8 py-8">
                    {products?.map((_, index) => (
                        <ProductCard key={index} product={products[index]} />
                    ))}
                </div>
            </section>
        </main>
    )
}