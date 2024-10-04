import Collections from "@/components/collections";
import ProductLayout from "./product-layout";
import { Product } from "@/lib/types";
import { categoryImages } from "@/lib/constants";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

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
                    backgroundImage: `url('${categoryImages[4].imgSrc}')`,
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
            </section>

            <Collections />

            <ProductLayout products={products} />
        </main>
    )
}