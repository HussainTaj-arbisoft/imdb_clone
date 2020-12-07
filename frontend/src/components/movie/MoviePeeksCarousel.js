import React, { Component } from 'react'
import { connect } from 'react-redux'

import SwiperCore, { Navigation, A11y, Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'


import styles from './css/PeekVideoCarousel.module.scss'
import '../layout/css/swiperCustomizations.scss'

import * as movieActions from './../../store/actions/movieActions'
import { Link } from 'react-router-dom';
import StatusBasedComponent from '../layout/StatusBasedComponent';


SwiperCore.use([Navigation, A11y, Controller]);

class MoviePeeksCarousel extends Component {
    state = {
        controlledSwiper: null,
    }

    componentDidMount() {
        this.setControlledSwiper(null);
        this.props.listPeekMovies();
    }

    setControlledSwiper = (controlledSwiper) => {
        this.setState({ controlledSwiper: controlledSwiper });
    }

    _renderUpNextSwiper() {
        let upNextSwiperMovies = [];
        let movies = this.props.peeks;
        if (movies && movies.length > 0) {
            upNextSwiperMovies = movies.slice(1);
            upNextSwiperMovies.push({ ...(movies[0]) });
        }

        return (
            <Swiper
                direction="vertical"
                spaceBetween={20}
                slidesPerView={'auto'} id="peekVideoCarouselNextSidebar"
                onSwiper={this.setControlledSwiper}
                loopedSlides={upNextSwiperMovies.length}
                loop={true}
                initialSlide={1}
                allowTouchMove={false}
                className={`${styles.peekVideoCarouselNextSidebar} position-absolute w-100`}>
                {
                    upNextSwiperMovies.map((movie) => {
                        let duration = 0;
                        if (movie.trailers && movie.trailers.length > 0)
                            duration = movie.trailers[0].duration;
                        return (
                            <SwiperSlide className="d-flex p-2" key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <img src={movie.poster_image} alt="Poster" height='100' />
                                </Link>
                                <div className="p-2">
                                    <span className="fa fa-play-circle"></span>
                                    <small className="text-light pl-2">{duration}</small>
                                    <h5>{movie.title}</h5>
                                    <p>{movie.tagline}</p>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        );
    }

    _renderPeekVideoSwiper() {
        let movies = this.props.peeks;
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
        return (
            <Swiper
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                controller={{ control: this.state.controlledSwiper }}
                spaceBetween={20}
                slidesPerView={1} id="peekVideoCarousel"
                loopedSlides={movies.length}
                loop={true}

                className={`${styles.peekVideoCarousel}`}>
                {
                    movies.map((movie) => {
                        let duration = 0;
                        if (movie.trailers && movie.trailers.length > 0)
                            duration = movie.trailers[0].duration;
                        return (
                            <SwiperSlide className="swiper-slide-item" key={movie.id}>
                                <Link
                                    to={`/movie/${movie.id}`}
                                    className="text-light">
                                    <img className="d-block w-100" src={movie.cover_image} alt={movie.title} />
                                    <div className="d-flex align-items-end swiper-slide-caption">
                                        <img src={movie.poster_image} alt="Poster" height='150' />
                                        <div className="px-4 w-100 d-flex align-items-center">
                                            {playCircleIconButton}
                                            <div>
                                                <h1>{movie.title}
                                                    <small className="text-secondary pl-2">{duration}</small>
                                                </h1>
                                                <p>{movie.tagline}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        )
                    })
                }
                <span className="swiper-button-next"></span>
                <span className="swiper-button-prev"></span>
            </Swiper>
        );
    }

    render() {
        let movies = this.props.peeks;
        let content;
        if (!movies || movies.length === 0)
            content = <p className="text-center p-4">Nothing to show.</p>
        else {
            let upNextSwiper = this._renderUpNextSwiper();
            let peekVideoSwiper = this._renderPeekVideoSwiper();
            content = (
                <div className="row pt-4 text-light text-left">
                    <div className="col-lg-8 col-md-12">
                        {peekVideoSwiper}
                    </div>
                    <div className="col-lg-4 d-none d-lg-block" >
                        <h2 className="text-primary">Up Next</h2>
                        {upNextSwiper}
                    </div>
                </div>
            );
        }

        return (
            <StatusBasedComponent
                loadingText={"Loading your peeks..."}
                status={this.props.status}
                statusCode={this.props.statusCode}
                statusText={this.props.statusText}
                errorMessage={this.props.errorMessage}
            >
                {content}
            </StatusBasedComponent>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.movies.peeks
    }
};

const MoviePeeksCarouselActions = ({
    listPeekMovies: movieActions.listPeekMovies
});

export default connect(mapStateToProps, MoviePeeksCarouselActions)(MoviePeeksCarousel);