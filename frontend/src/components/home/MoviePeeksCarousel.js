import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwiperCore, { Navigation, A11y, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'


import styles from './css/PeekVideoCarousel.module.scss'
import './css/swiperCustomizations.scss'

import * as movieActions from './../../store/actions/movieActions'


SwiperCore.use([Navigation, A11y, Controller]);

class MoviePeeksCarousel extends Component {
    state = {
        controlledSwiper: null,
        movies: []
    }

    componentDidMount() {
        this.props.listPeekMovies();
    }

    setControlledSwiper = (controlledSwiper) => {
        this.setState({ controlledSwiper: controlledSwiper });
    }

    render() {
        let upNextSwiperMovies = [];
        if (this.props.movies) {
            upNextSwiperMovies = this.props.movies.slice(1);
            upNextSwiperMovies.push({ ...(this.props.movies[0]) });
        }

        let playCircleIconButton = (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                className={`${styles.circlePlayIcon}`}
                viewBox="0 0 30.051 30.051">
                <g id="logoCirclePlay">
                    <path d="M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069
                    c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532
                    c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z"/>
                    <path d="M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021
                    C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518
                    c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z"/>
                </g>
            </svg>
        );

        let upNextSwiper = (
            <Swiper
                direction="vertical"
                spaceBetween={20}
                slidesPerView={'auto'} id="peekVideoCarouselNextSidebar"
                onSwiper={this.setControlledSwiper}
                loopedSlides={upNextSwiperMovies.length}
                loop={true}
                initialSlide={1}
                allowTouchMove={false}
                className={`${styles.peekVideoCarouselNextSidebar} position-absolute`}>
                {
                    upNextSwiperMovies.map((video) => (
                        <SwiperSlide className="d-flex p-2" key={video.id}>
                            <img src={video.posterUrl} alt="Poster" height='100' />
                            <div className="p-2">
                                <span className="fa fa-play-circle"></span>
                                <small className="text-light pl-2">{video.trailerDuration}</small>
                                <h5>{video.title}</h5>
                                <p>{video.subTitle}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        );
        let peekVideoSwiper = (
            <Swiper
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                controller={{ control: this.state.controlledSwiper }}
                spaceBetween={20}
                slidesPerView={1} id="peekVideoCarousel"
                loopedSlides={this.props.movies.length}
                loop={true}

                className={`${styles.peekVideoCarousel}`}>
                {
                    this.props.movies.map((video) => (
                        <SwiperSlide className="swiper-slide-item" key={video.id}>
                            <img className="d-block w-100" src={video.billboardImageUrl} alt={video.title} />
                            <div className="d-flex align-items-end swiper-slide-caption">
                                <img src={video.posterUrl} alt="Poster" height='150' />
                                <div className="px-4 w-100 d-flex align-items-center">
                                    {playCircleIconButton}
                                    <div>
                                        <h1>{video.title}
                                            <small className="text-secondary pl-2">{video.trailerDuration}</small>
                                        </h1>
                                        <p>{video.subTitle}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <span className="swiper-button-next"></span>
                <span className="swiper-button-prev"></span>
            </Swiper>
        );



        if (this.props.movies)
            return (
                <div className="row pt-4 text-light text-left">
                    <div className="col-lg-8 col-md-12">
                        {peekVideoSwiper}
                    </div>
                    <div className="col-lg-4 d-none d-lg-block" >
                        <h2 className="text-primary">Up Next</h2>
                        {upNextSwiper}
                    </div>
                </div>
            )
        else
            return (<p className="p-4 text-primary">Loading...</p>)
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.peeks
    }
};

const MoviePeeksCarouselActions = ({
    listPeekMovies: movieActions.listPeekMovies
});

export default connect(mapStateToProps, MoviePeeksCarouselActions)(MoviePeeksCarousel);