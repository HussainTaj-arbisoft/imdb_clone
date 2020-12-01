import React from 'react'

import SwiperCore, { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'

import MoviePosterCard from './MoviePosterCard'

SwiperCore.use([Navigation, A11y]);

export default function MoviePosterSwiper(props) {
    return (
        <Swiper
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            spaceBetween={20}
            slidesPerView={'auto'}>
            {
                props.movies.map((movie) => (
                    <SwiperSlide key={movie.id} style={{ width: '200px' }}>
                        <MoviePosterCard
                            title={movie.title}
                            rating={movie.rating}
                            posterUrl={movie.posterUrl}
                        />
                    </SwiperSlide>
                ))
            }
            <span className="swiper-button-next"></span>
            <span className="swiper-button-prev"></span>
        </Swiper>
    )
}
