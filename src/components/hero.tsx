'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../app/css/hero-swiper.css';

type SlidesProps = {
    imgSrc: string
    text: string
    credit: string
}

const slides: SlidesProps[] = [
    { imgSrc: '/electronics.jpg', text: 'Slide 1', credit: 'Kelly Sikkema' },
    { imgSrc: '/jewelery.jpg', text: 'Slide 2', credit: 'Jacob Vega' },
    { imgSrc: '/mens-clothing.jpg', text: 'Slide 3', credit: 'Joel Muniz' },
    { imgSrc: '/womens-clothing.jpg', text: 'Slide 3', credit: 'Samuel Dixon' },
]

export default function Hero() {
    // TODO: pagination bullet visibility
    // TODO: add error handling and loading

    const [categoryNames, setCategoryNames] = useState<string[] | null>(null);

    useEffect(() => {
        async function fetchCategoryNames() {
            try {
                const res = await fetch('https://fakestoreapi.com/products/categories');
                const data = await res.json();

                setCategoryNames(data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchCategoryNames();
    }, []);

    return (
        <section>
            <Swiper
                modules={[EffectFade, Navigation, Pagination]}
                effect={'fade'}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    0: { navigation: { enabled: false } },
                    768: { navigation: { enabled: true } },
                }}
                style={{ height: '500px' }}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        style={{
                            backgroundImage: `url('${slide.imgSrc}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'top 0 left -100px',
                            backgroundRepeat: 'no-repeat',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'start',
                            paddingLeft: '2rem',
                            paddingRight: '2rem',
                            gap: '2rem',
                        }}
                    >
                        <h1 className='text-5xl font-bold text-white/60'>Lorem ipsum dolor sit amet.</h1>
                        {categoryNames &&
                            <Link href={`/shop/${categoryNames[index]}`} className='text-white/80 text-xl border-2 border-white/80 px-6 py-2 hover:bg-black hover:border-black transition-all duration-300'>
                                Shop now
                            </Link>
                        }

                        <small className='text-white/60 font-light bottom-1 right-1 absolute'>Photo by {slide.credit} on Unsplash.</small>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}