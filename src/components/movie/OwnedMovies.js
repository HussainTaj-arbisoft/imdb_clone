import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../layout/Header";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import * as movieActions from "./../../store/actions/movieActions";
import WishListItemCard from "./WishListItemCard";

class OwnedMovies extends Component {
  componentDidMount() {
    this.props.listOwnedMovies();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container text-light">
          <h1 className="text-center text-primary mt-2">Your Movies</h1>
          <StatusBasedComponent
            loadingText={"Loading your movies..."}
            status={this.props.status}
            statusCode={this.props.statusCode}
            statusText={this.props.statusText}
            errorMessage={this.props.errorMessage}
            className="text-white"
          >
            <div>
              {this.props.movies?.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}/`}
                  className="hyperlinkCard"
                >
                  <WishListItemCard movie={movie} removeable={false} />
                </Link>
              ))}
            </div>
          </StatusBasedComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.movies.owned,
  };
};

const ownedMoviesActions = {
  listOwnedMovies: movieActions.listOwnedMovies,
};

export default connect(mapStateToProps, ownedMoviesActions)(OwnedMovies);
