import Collections from "@/components/collections";
import ShopControlBar from "@/components/shop-control-bar";
import ProductList from "@/components/product-list";
import { capitalizeFirstLetter } from "@/utils/format-string";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

export default function ShopCategory({ params }: { params: { slug: string } }) {
    const title = decodeURIComponent(capitalizeFirstLetter(params.slug));
    const bg = decodeURIComponent(params.slug).replace(`'`, '').split(' ').join('-')

    return (
        <main>
            <section
                className="bg-cover bg-center bg-no-repeat h-32 flex flex-col justify-center items-center text-white/90"
                style={{
                    backgroundImage: `url('/${bg}.jpg')`,
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
                <ProductList category={params.slug} />
            </section>
        </main>
    )
}