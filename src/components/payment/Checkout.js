import React, { Component } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

import Header from "../layout/Header";
import * as movieActions from "./../../store/actions/movieActions";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import WishListItemCard from "../movie/WishListItemCard";
import MovieDetailStats from "../movie/MovieDetailStats";

const stripePromise = loadStripe(
  "pk_test_51HyMdNA2mXrNBb00gGItbwzQbXH1PyQxkjQCQt4GKDEeo7W6RGYYChj6pgxK8n6Yl3SN4SUXxE0cCprmsxg0W39T00cqMAnuaB"
);

class Checkout extends Component {
  componentDidMount() {
    this.props.detailMovie(this.props.match.params.movieId);
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.movieId !== prevProps.match.params.movieId)
      this.props.detailMovie(this.props.match.params.movieId);
  }
  handleClick = async (event) => {
    const stripe = await stripePromise;
    let movieId = this.props.match.params.movieId;
    const response = await axios.post(`/api/payments/create_session_id/`, {
      movie_id: movieId,
    });
    console.log(response);
    let session = JSON.parse(response.data);
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result);

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  render() {
    let movie = this.props.movieData;
    const query = new URLSearchParams(window.location.search);
    const isSuccess = query.get("success");
    const isCanceled = query.get("canceled");
    return (
      <div>
        <Header />
        <div className="container">
          <StatusBasedComponent
            loadingText={"Loading..."}
            status={this.props.status}
            statusCode={this.props.statusCode}
            statusText={this.props.statusText}
            errorMessage={this.props.errorMessage}
            className="text-white"
          >
            <WishListItemCard movie={movie} className="text-light" />
            <MovieDetailStats movie={movie} />
            <div className="text-light">
              {isSuccess ? (
                <h2>Payment Received. Wait a while for confirmation.</h2>
              ) : (
                  <>
                    {isCanceled ? <h3>Payment Canceled</h3> : null}
                    <div className="text-white text-center">
                      <h2>Price</h2>
                      <h2 className="text-primary">${movie?.price}</h2>
                    </div>
                    <button
                      className="btn btn-primary w-100 my-2"
                      onClick={this.handleClick}
                    >
                      Checkout
                  </button>
                  </>
                )}
            </div>
          </StatusBasedComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.movies.detail,
  };
};

const movieDetailListActions = {
  detailMovie: movieActions.detailMovie,
};

export default withRouter(
  connect(mapStateToProps, movieDetailListActions)(Checkout)
);
