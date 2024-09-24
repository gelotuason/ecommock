import Collections from "@/components/collections";
import ShopControlBar from "@/components/control-bar";
import ProductList from "@/components/product-list";
import { formatSlug } from "@/utils/format-slug";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

export default function ShopCategory({ params }: { params: { slug: string } }) {
    const title = formatSlug(params.slug.charAt(0).toUpperCase() + params.slug.slice(1));
    const bg = formatSlug(params.slug).replace(`'`, '').split(' ').join('-')

    return (
        <main>
            <section
                className="bg-cover bg-no-repeat h-32 flex flex-col justify-center items-center text-white"
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
                            <BreadcrumbPage>Shop</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-white">{title}</BreadcrumbPage>
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