import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import * as wishListActions from '../../store/actions/wishListActions'
import Header from '../layout/Header'
import StatusBasedComponent from '../layout/StatusBasedComponent';

class WishList extends Component {
    componentDidMount() {
        this.props.getWishList();
    }
    render() {
        console.log(this.props)
        let wishListItems = this.props.items ?? [];
        let movies = wishListItems.map((item) => item.movie_item);
        let moviesList = (
            movies.map((movie) => (

                <Link to={`/movie/${movie.id}`}
                    className="hyperlinkCard"
                >
                    <div className="card bg-dark my-4"
                        style={{
                            background: `URL(${movie.cover_image}) center`,
                            border: "0"
                        }}
                    >
                        <div className="d-flex" style={{
                            backgroundColor: "rgba(0,0,0,0.9)"
                        }}>
                            <img
                                src={movie.poster_image}
                                className="rounded"
                                alt="profile"
                                width="150px"
                                height="100%"
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "top",
                                }}
                            />
                            <div className="d-flex flex-column px-4 justify-content-around">
                                <h1 className="card-title user-select-none">{movie.title}</h1>
                                <div>
                                    <p className="card-text user-select-none">{movie.tagline}</p>
                                    <p className="card-text user-select-none">{movie.synopsis}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
        );
        return (
            <div>
                <Header />
                <div className="container">

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
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.wishList.list
    }
};

const wishListComponentActions = ({
    getWishList: wishListActions.getWishList
});

export default connect(mapStateToProps, wishListComponentActions)(WishList);