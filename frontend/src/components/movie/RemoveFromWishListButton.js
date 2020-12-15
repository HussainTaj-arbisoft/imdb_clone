import React, { Component } from 'react'

import { connect } from 'react-redux'

import * as wishListActions from '../../store/actions/wishListActions'
import StatusBasedComponent from '../layout/StatusBasedComponent';


class RemoveFromWishListButton extends Component {
    removeFromWishList = (event) => {
        event.preventDefault();
        if (this.props.auth.isAuthenticated) {
            this.props.wishListRemoveMovie(this.props.wishListId);
            this.props.getWishList();
        }
    }
    render() {
        return (
            <StatusBasedComponent
                status={this.props.status}
                statusCode={this.props.statusCode}
                statusText={this.props.statusText}
                errorMessage={this.props.errorMessage}
                className="text-white"
                circularProgressIndicatorProps={{
                    height: "38px",
                    width: "38x"
                }}
            >
                <button
                    className="btn btn-secondary text-danger bg-transparent border-0 text-middle"
                    onClick={this.removeFromWishList}>
                    <span className="fa fa-trash"></span><br /> Remove
                </button>
            </StatusBasedComponent>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        ...state.wishList.removed
    }
};

const removeFromWishListActions = ({
    wishListRemoveMovie: wishListActions.wishListRemoveMovie,
    getWishList: wishListActions.getWishList
});

export default connect(mapStateToProps, removeFromWishListActions)(RemoveFromWishListButton);