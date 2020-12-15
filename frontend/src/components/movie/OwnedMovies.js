import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as movieActions from './../../store/actions/movieActions'
import StatusBasedComponent from '../layout/StatusBasedComponent';
import Header from '../layout/Header';
import WishListItemCard from './WishListItemCard';
import { Link } from 'react-router-dom';


class OwnedMovies extends Component {
    componentDidMount() {
        this.props.listOwnedMovies();
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Header />
                <div className="container text-light">
                    {
                        this.props.movies?.map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.id}/`}
                                className="hyperlinkCard">
                                <WishListItemCard movie={movie} removeable={false} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.movies.owned
    }
};

const ownedMoviesActions = ({
    listOwnedMovies: movieActions.listOwnedMovies
});

export default connect(mapStateToProps, ownedMoviesActions)(OwnedMovies);