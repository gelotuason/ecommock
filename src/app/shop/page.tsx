import Collections from "@/components/collections";
import ShopControlBar from "@/components/shop-control-bar";
import ProductList from "@/components/product-list";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";

export default function Shop() {

    return (
        <main>
            <section
                className="bg-cover bg-no-repeat bg-center h-32 flex flex-col justify-center items-center text-white"
                style={{
                    backgroundImage: `url('/shop.jpg')`,
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

            <section className="px-4 py-10">
                <ShopControlBar />

                <ProductList />
            </section>
        </main>
    )
}