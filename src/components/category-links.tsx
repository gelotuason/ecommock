import Link from "next/link";
import { getCategories } from "@/lib/api/products";
import { capitalizeFirstLetter } from "@/utils/string-utils";
import { useEffect, useState } from "react";

type CategoryLinksProps = {
    wrapperClassName?: string
    linkClassName?: string
    onClick?: () => void
}

// TODO: return cached component

export default function CategoryLinks({ wrapperClassName, linkClassName, onClick }: CategoryLinksProps) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const fetchedCategories = await getCategories();

            if (fetchedCategories) setCategories(fetchedCategories);
        }

        fetchCategories();
    }, [])

    return (
        <div className={wrapperClassName}>
            {categories.map((category, index) => (
                <Link onClick={onClick} key={index} className={linkClassName} href={`/shop/${category}`}>
                    {capitalizeFirstLetter(category)}
                </Link>
            ))}
        </div>
    )
}