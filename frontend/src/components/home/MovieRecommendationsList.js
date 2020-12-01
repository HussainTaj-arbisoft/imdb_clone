import React, { Component } from 'react'
import { connect } from 'react-redux'


import './css/swiperCustomizations.scss'
import * as movieActions from './../../store/actions/movieActions'

import MoviePosterSwiper from './MoviePosterSwiper'

class MovieRecommendationsList extends Component {
    state = {
        movies: [],
    }

    componentDidMount() {
        this.props.listRecommendedMovies();
    }

    render() {
        if (this.props.movies) {
            return (
                <div className="py-4 text-left">
                    <h1 className="text-left text-primary">What to watch</h1>
                    <MoviePosterSwiper movies={this.props.movies} />
                </div>
            )
        }
        return <p className="p-4 text-primary">Loading...</p>
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies.recommendations
    }
};

const movieRecommentationActions = ({
    listRecommendedMovies: movieActions.listRecommendedMovies,
});

export default connect(mapStateToProps, movieRecommentationActions)(MovieRecommendationsList);