import React, { Component } from 'react'
import { connect } from 'react-redux'


import SwiperCore, { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'

import './css/swiperCustomizations.scss'
import * as celebrityActions from './../../store/actions/celebrityActions'

import CelebrityCard from './CelebrityCard'


SwiperCore.use([Navigation, A11y]);


class CelebritiesBornTodayList extends Component {
    state = {
        celebrities: [],
    }

    componentDidMount() {
        this.props.listCelebritiesBornToday();
    }

    render() {
        if (this.props.celebrities) {
            return (
                <div className="py-4 text-left">
                    <h1 className="text-left text-primary">Celebrities Born Today</h1>
                    <Swiper
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        spaceBetween={20}
                        slidesPerView={'auto'}>
                        {
                            this.props.celebrities.map((celebrity) => (
                                <SwiperSlide key={celebrity.id} style={{ width: '200px' }}>
                                    <CelebrityCard
                                        name={celebrity.name}
                                        age={celebrity.age}
                                        imageUrl={celebrity.imageUrl}

                                    />
                                </SwiperSlide>
                            ))
                        }
                        <span className="swiper-button-next"></span>
                        <span className="swiper-button-prev"></span>
                    </Swiper>
                </div>
            )
        }
        return <p className="p-4 text-primary">Loading...</p>
    }
}

const mapStateToProps = (state) => {
    return {
        celebrities: state.celebrities.bornToday
    }
};

const celebritiesBornTodayListActions = ({
    listCelebritiesBornToday: celebrityActions.listCelebritiesBornToday,
});

export default connect(mapStateToProps, celebritiesBornTodayListActions)(CelebritiesBornTodayList);