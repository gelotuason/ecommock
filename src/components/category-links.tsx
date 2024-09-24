import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/format-string";

type CategoryLinksProps = {
    wrapperClassName?: string
    linkClassName?: string
}

export default async function CategoryLinks({ wrapperClassName, linkClassName }: CategoryLinksProps) {
    const res = await fetch('https://fakestoreapi.com/products/categories', { cache: 'force-cache' });
    const categoryNames: string[] = await res.json();

    return (
        <div className={wrapperClassName}>
            {categoryNames.map((_, index) => (
                <Link className={linkClassName} href={`/shop/${categoryNames[index]}`}>
                    {capitalizeFirstLetter(categoryNames[index])}
                </Link>
            ))}
        </div>

    )
}