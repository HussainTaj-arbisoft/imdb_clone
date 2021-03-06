import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as wishListActions from "../../store/actions/wishListActions";
import StatusBasedComponent from "../layout/StatusBasedComponent";

class AddToWishListButton extends Component {
  state = {
    redirect: false
  }
  addToWishList = (event) => {
    event.preventDefault();
    if (this.props.auth.isAuthenticated)
      this.props.wishListAddMovie(this.props.movieId, this.props.auth.user.id);
    else
      this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect)
      return <Redirect to="/auth/signin/" />
    return (
      <StatusBasedComponent
        status={this.props.status}
        statusCode={this.props.statusCode}
        statusText={this.props.statusText}
        errorMessage={this.props.errorMessage}
        className="text-white"
        circularProgressIndicatorProps={{
          height: "38px",
          width: "38x",
        }}
      >
        <button
          className="btn btn-secondary text-middle w-100"
          onClick={this.addToWishList}
        >
          <span className="fa fa-plus"></span> Wishlist
        </button>
      </StatusBasedComponent>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    ...state.wishList.added,
  };
};

const addToWishListActions = {
  wishListAddMovie: wishListActions.wishListAddMovie,
};

export default connect(
  mapStateToProps,
  addToWishListActions
)(AddToWishListButton);
