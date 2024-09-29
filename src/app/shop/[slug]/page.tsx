import Collections from "@/components/collections";
import ShopControlBar from "@/components/shop-control-bar";
import ProductCard from "@/components/product/product-card";
import { heroSlides } from "@/lib/data";
import { capitalizeFirstLetter } from "@/utils/format-string";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Product } from "@/lib/types";

function getBgSrc(uri: string): string {
    const formattedInput = decodeURIComponent(uri).replace(`'`, '').split(' ').join('-');

    const bgSrcList: boolean[] = [];

    heroSlides.map((_, index) => {
        bgSrcList.push(
            Object
                .values(heroSlides[index])[0]
                .includes(formattedInput)
        );
    });

    const bgSrc = heroSlides[bgSrcList.indexOf(true)].imgSrc;

    return bgSrc;
}

async function getProductsByCategory(categoryName: string) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${categoryName}`);
        const data: Product[] = await res.json();

        if (!res.ok) throw new Error(`Failed to fetch data. Status: ${res.status}`);
        if (!data.length) throw new Error(`Failed to fetch data.`);

        return data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch data.')
    }
}

export default async function ShopCategory({ params }: { params: { slug: string } }) {
    // TODO: error and loading states

    const title = decodeURIComponent(capitalizeFirstLetter(params.slug)); // shop title
    const bgSrc = getBgSrc(params.slug);

    const products: Product[] = await getProductsByCategory(params.slug);

    return (
        <main>
            <section
                className="bg-cover bg-center bg-no-repeat h-32 flex flex-col justify-center items-center text-white/90"
                style={{
                    backgroundImage: `url('${bgSrc}')`,
                }}
            >
                <h1 className="font-semibold text-3xl">{title}</h1>
                <Breadcrumb>
                    <BreadcrumbList className="text-white/60">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white/90">{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <Collections />

            <section className="px-4 py-10">
                <ShopControlBar />

                <div className="grid grid-cols-2 gap-x-3 gap-y-8 py-8">
                    {products && products.map((_, index) => (
                        <ProductCard key={index} product={products[index]} />
                    ))}
                </div>
            </section>
        </main>
    )
}