export async function getCategories() {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data: string[] = await res.json();

        console.log(data);

        if (!res.ok) throw Error('Failed to fetch data.');

        return data;
    } catch (err) {
        console.error(err);
    }
}