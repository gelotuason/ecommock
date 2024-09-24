'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Products } from "@/lib/types";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/css/collections-swiper.css';

export default function Collections() {
    // TODO: avoid returning to 1st slide when user clicked or rerendering
    // TODO: add error handling

    const [collections, setCollections] = useState<Products[] | null>(null);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const tempCollections: Products[] = [];

                const [electronics, jewelery, mens, womens] = await Promise.all([
                    fetch('https://fakestoreapi.com/products/category/electronics?limit=1'),
                    fetch('https://fakestoreapi.com/products/category/jewelery?limit=1'),
                    fetch(`https://fakestoreapi.com/products/category/men's%20clothing?limit=1`),
                    fetch(`https://fakestoreapi.com/products/category/women's%20clothing?limit=1`),
                ]);

                tempCollections.push(
                    ...await electronics.json(),
                    ...await jewelery.json(),
                    ...await mens.json(),
                    ...await womens.json(),
                )

                setCollections(tempCollections);
            } catch (err) {
                console.error(err);
            }
        }

        fetchCollections();
    }, []);

    if (!collections || collections?.length === 0) return <div>Loading...</div>

    return (
        <section className="px-4 py-8">
            <h1 className="text-lg mb-3 text-center font-medium">Our Collections</h1>
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={2}
                navigation={{ enabled: true }}
            >
                {collections && collections.map(collection => (
                    <SwiperSlide>
                        <div className="text-center">
                            <Link
                                href={`/shop/${collection.category}`}
                                className="bg-white flex mb-1 p-2 rounded-full"
                            >
                                <img src={collection.image} alt={collection.category} className="h-[100px] w-[60px] mx-auto" />
                            </Link>
                            <p className="text-lg">{collection.category}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section >
    )
}