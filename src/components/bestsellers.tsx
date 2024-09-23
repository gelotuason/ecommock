'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Products } from "@/lib/types";
import { ShoppingCart, Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/css/bestsellers-swiper.css';

export default function Bestsellers() {
    // TODO: swiper nav button disabled on last slide

    const [bestsellers, setBestsellers] = useState<Products[] | null>(null);

    useEffect(() => {
        async function fetchBestsellers() {
            try {
                const res = await fetch('https://fakestoreapi.com/products/', { cache: 'force-cache' });
                const data: Products[] = await res.json();

                const filteredProducts = data.filter(product => product.rating.count > 399);

                setBestsellers(filteredProducts);
            } catch (err) {
                console.error(err);
            }
        }

        fetchBestsellers();
    }, []);

    if (!bestsellers) return <div>Loading..</div>

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
                    {bestsellers.map(bestseller => (
                        <SwiperSlide key={bestseller.id}>
                            <Link
                                href='/'
                                className="bg-white shadow-sm flex bg-center bg-contain bg-no-repeat h-44"
                                style={{
                                    backgroundImage: `url('${bestseller.image}')`,
                                }}
                            >
                                <div className="relative w-max mx-auto flex items-end h-full pb-2">
                                    <div className="bg-[#f5f5f5] rounded flex items-center divide-x shadow-lg">
                                        <button className="p-1 hover:bg-black hover:text-white hover:rounded-s transition-all duration-300">
                                            <ShoppingCart size={20} strokeWidth={1} />
                                        </button>
                                        <button className="p-1 hover:bg-black hover:text-white transition-all duration-300">
                                            <Heart size={20} strokeWidth={1} />
                                        </button>
                                        <button className="p-1 hover:bg-black hover:text-white hover:rounded-e transition-all duration-300">
                                            <Search size={20} strokeWidth={1} />
                                        </button>
                                    </div>
                                </div>
                            </Link>

                            <div className="px-2 space-y-1 mt-2 text-sm">
                                <p className="font-medium">{bestseller.price}</p>
                                <p className="text-accent">{bestseller.category}</p>
                                <p className="font-semibold">{bestseller.title}</p>
                            </div>
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