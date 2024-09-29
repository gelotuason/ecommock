'use client';

import ProductCard from "@/components/product/product-card";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/css/bestsellers-swiper.css';

export default function Bestsellers() {
    // TODO: swiper nav button disabled on last slide
    // TODO: error and loading states

    const [bestsellers, setBestsellers] = useState<Product[] | null>(null);

    useEffect(() => {
        async function fetchBestsellers() {
            try {
                const res = await fetch('https://fakestoreapi.com/products/');
                const data: Product[] = await res.json();

                if (!res.ok) console.error('Failed to fetch data.'); // temporary error handling

                const filteredProducts = data.filter(product => product.rating.count > 399);

                setBestsellers(filteredProducts);
            } catch (err) {
                console.error(err);
            }
        }

        fetchBestsellers();
    }, []);

    return (
        <section className="px-3 py-4" >
            <h1 className="text-4xl text-center">Bestsellers</h1>
            <h2 className="text-lg text-center text-accent mb-4">Don&apos;t miss our bestsellers of the month!</h2>

            {
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={2}
                    navigation={{ enabled: false }}
                    pagination={{ clickable: true }}
                >
                    {bestsellers && bestsellers.map((bestseller) => (
                        <SwiperSlide key={bestseller.id}>
                            <ProductCard product={bestseller} />
                        </SwiperSlide>
                    ))}
                    <div
                        slot="container-start"
                        className="flex justify-center gap-2 mb-4">
                        <BestsellersNavBtn />
                    </div>
                </Swiper>
            }
        </section >
    )
}

function BestsellersNavBtn() {
    const swiper = useSwiper();

    return (
        <>
            <button
                className="bg-white rounded-full p-2 hover:bg-black hover:text-white transition-all duration-300"
                onClick={() => swiper.slidePrev()}>
                <ChevronLeft strokeWidth={1} />
            </button>
            <button
                className="bg-white rounded-full p-2 hover:bg-black hover:text-white transition-all duration-300"
                onClick={() => swiper.slideNext()}>
                <ChevronRight strokeWidth={1} />
            </button>
        </>
    )
}