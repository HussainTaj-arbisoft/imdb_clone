import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as wishListActions from "../../store/actions/wishListActions";
import Header from "../layout/Header";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import WishListItemCard from "./WishListItemCard";

class WishList extends Component {
  componentDidMount() {
    this.props.getWishList();
  }
  render() {
    let wishListItems = this.props.items ?? [];
    let moviesList = wishListItems.map((item) => (
      <Link
        to={`/movie/${item.movie_item.id}`}
        className="hyperlinkCard"
        key={item.movie_item.id}
      >
        <WishListItemCard
          movie={item.movie_item}
          wishListId={item.id}
          removeable={true}
        />
      </Link>
    ));
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="text-center text-primary mt-2">Your Wish List</h1>
          <StatusBasedComponent
            loadingText="Loading your wish list..."
            status={this.props.status}
            statusCode={this.props.statusCode}
            statusText={this.props.statusText}
            errorMessage={this.props.errorMessage}
            className="text-white"
          >
            {moviesList}
          </StatusBasedComponent>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.wishList.list,
  };
};

const wishListComponentActions = {
  getWishList: wishListActions.getWishList,
};

export default connect(mapStateToProps, wishListComponentActions)(WishList);
