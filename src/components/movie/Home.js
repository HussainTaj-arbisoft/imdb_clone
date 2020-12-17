import React, { Component } from "react";

import CelebritiesBornTodayList from "../celebrity/CelebritiesBornTodayList";
import Header from "../layout/Header";
import MovieFanFavoritesList from "./MovieFanFavoritesList";
import MoviePeeksCarousel from "./MoviePeeksCarousel";
import MovieRecommendationsList from "./MovieRecommendationsList";

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
    );
  }
}

export default Home;
