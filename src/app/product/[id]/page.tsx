import ProductDetail from "@/components/product/product-detail";

async function getProduct(id: number) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        return res.json();
    } catch (err) {
        console.error(err);
    }
}

export default async function Product({ params }: { params: { id: number } }) {
    const selectedProduct = await getProduct(params.id);

    // TODO: add go back link

    return (
        <main className="px-4 py-10 flex-1 space-y-2">
            <ProductDetail selectedProduct={selectedProduct} />
        </main>
    )
}