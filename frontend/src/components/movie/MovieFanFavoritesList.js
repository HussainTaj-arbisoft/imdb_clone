import React, { Component } from "react";
import { connect } from "react-redux";

import "../layout/css/swiperCustomizations.scss";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import * as movieActions from "./../../store/actions/movieActions";

import MoviePosterSwiper from "./MoviePosterSwiper";

class MovieFanFavoritesList extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.props.listFanFavoriteMovies();
  }

  render() {
    let movies = this.props.fanFavorites;
    return (
      <div className="py-4 text-left">
        <h1 className="text-left text-primary">Fan Favorites</h1>
        <StatusBasedComponent
          loadingText={"Loading fan favorites..."}
          status={this.props.status}
          statusCode={this.props.statusCode}
          statusText={this.props.statusText}
          errorMessage={this.props.errorMessage}
          className="text-white"
        >
          <MoviePosterSwiper movies={movies} />
        </StatusBasedComponent>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.movies.fanFavorites,
  };
};

const movieFanFavoritesListActions = {
  listFanFavoriteMovies: movieActions.listFanFavoriteMovies,
};

export default connect(
  mapStateToProps,
  movieFanFavoritesListActions
)(MovieFanFavoritesList);
