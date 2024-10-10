import { Product } from "@/lib/types";

export async function getSearchedProducts(search: string) {
    if (!search) return [];

    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products: Product[] = await res.json();

        const searchedProducts = products.filter(product => product.title.toLowerCase().includes(search));

        if (!res.ok) throw Error('Failed to fetch data.');

        return searchedProducts;
    } catch (err) {
        console.error(err);
    }
}

export async function getCategories() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data: string[] = await res.json();

        if (!res.ok) throw Error('Failed to fetch data.');

        return data;
    } catch (err) {
        console.error(err);
    }
}