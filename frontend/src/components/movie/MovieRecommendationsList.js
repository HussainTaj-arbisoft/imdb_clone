import React, { Component } from 'react'
import { connect } from 'react-redux'


import '../layout/css/swiperCustomizations.scss'
import StatusBasedComponent from '../layout/StatusBasedComponent'
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
        let movies = this.props.recommendations;
        return (
            <div className="py-4 text-left">
                <h1 className="text-left text-primary">Recommendations</h1>
                <StatusBasedComponent
                    loadingText={"Loading recommendations..."}
                    status={this.props.status}
                    statusCode={this.props.statusCode}
                    statusText={this.props.statusText}
                    errorMessage={this.props.errorMessage}
                    className="text-white"
                >
                    <MoviePosterSwiper movies={movies} />
                </StatusBasedComponent>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.movies.recommendations
    }
};

const movieRecommentationActions = ({
    listRecommendedMovies: movieActions.listRecommendedMovies,
});

export default connect(mapStateToProps, movieRecommentationActions)(MovieRecommendationsList);