import React, { Component } from 'react'

import Header from '../layout/Header'
import MoviePeeksCarousel from './MoviePeeksCarousel'
import MovieRecommendationsList from './MovieRecommendationsList'
import MovieFanFavoritesList from './MovieFanFavoritesList'
import CelebritiesBornTodayList from './CelebritiesBornTodayList'

class Home extends Component {
    render() {
        return (
            <div className="mb-4">
                <Header />
                <div className="container">
                    <MoviePeeksCarousel />
                    <MovieRecommendationsList />
                    <MovieFanFavoritesList />
                    <CelebritiesBornTodayList />
                </div>
            </div>
        )
    }
}

export default Home;