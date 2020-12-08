import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";

import StatusBasedComponent from '../layout/StatusBasedComponent'

import * as movieActions from './../../store/actions/movieActions';


class UserMovieRating extends Component {
    state = {
        rating: 1,
        review: ""
    }

    setRating = (value) => {
        this.setState({ rating: value });
    }

    setReview = (event) => {
        this.setState({ review: event.target.value });
    }

    rateMovie = () => {
        this.props.rateMovie(
            this.props.movie_id,
            this.props.auth?.user?.id,
            this.state.rating
        );
    }

    reviewMovie = () => {
        this.props.reviewMovie(
            this.props.movie_id,
            this.props.auth?.user?.id,
            this.state.review
        );
    }

    reviewRateMovie = () => {
        this.rateMovie();
        if (this.state.review !== "")
            this.reviewMovie();
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.getUserMovieRating(this.props.movie_id);
            this.props.getUserMovieReview(this.props.movie_id);
        }
    }
    render() {
        if (!this.props.auth.isAuthenticated) {
            return (
                <div className="text-center p-4 w-100">
                    <p>Sign in to rate.</p>
                </div>
            );
        }
        let currentUserRating = this.props.currentUserRating;
        let currentUserReview = this.props.currentUserReview;
        let currentRatingReviewElement = "";
        currentRatingReviewElement = (
            <>
                <b>You Rated</b>
                <div className="card border-secondary bg-dark my-1">
                    <div className="card-body">
                        <p><strong>{this.props.auth.user.first_name}</strong></p>
                        <StatusBasedComponent
                            loadingText="Loading..."
                            status={currentUserRating.status}
                            statusCode={currentUserRating.statusCode}
                            statusText={currentUserRating.statusText}
                            errorMessage={currentUserRating.errorMessage}
                        >
                            <p>
                                <span className="fa fa-star text-primary mr-2"></span>
                                {this.props.currentUserRating.rating ?? "Unrated"}
                            </p>
                        </StatusBasedComponent>
                        <StatusBasedComponent
                            loadingText="Loading..."
                            status={currentUserReview.status}
                            statusCode={currentUserReview.statusCode}
                            statusText={currentUserReview.statusText}
                            errorMessage={currentUserReview.errorMessage}
                        >
                            <p>
                                {this.props.currentUserReview.review}
                            </p>
                        </StatusBasedComponent>
                    </div>
                </div>
            </>
        );
        return (
            <div className="p-2 bg-dark ">
                {currentRatingReviewElement}
                <h1 className="text-primary mt-2">Rate this video</h1>
                <div className="w-100">
                    <div className="form-group d-flex align-items-center">
                        <ReactStars
                            count={10}
                            onChange={this.setRating}
                            size={24}
                            activeColor="#F5C518"
                            value={this.state.rating}
                            classNames="mr-2"
                        />
                        <strong> {this.state.rating}</strong>
                    </div>
                    <div className="form-group">
                        <textarea
                            className="w-100"
                            onChange={this.setReview}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary"
                            onClick={this.reviewRateMovie}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        userRating: state.movies.detailUserRating,
        currentUserRating: state.movies.detailCurrentUserRating,
        currentUserReview: state.movies.detailCurrentUserReview,
    };
};

const userMovieRatingActions = ({
    rateMovie: movieActions.rateMovie,
    reviewMovie: movieActions.reviewMovie,
    getUserMovieRating: movieActions.getUserMovieRating,
    getUserMovieReview: movieActions.getUserMovieReview,
});

export default connect(mapStateToProps, userMovieRatingActions)(UserMovieRating);