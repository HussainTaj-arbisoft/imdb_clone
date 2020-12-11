import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './css/SearchBar.module.scss'
import * as movieActions from './../../store/actions/movieActions'
import StatusBasedComponent from './StatusBasedComponent'

class SearchBar extends Component {
    state = {
        searchString: ""
    }

    searchTimeoutHandle = null;

    searchMovie = (searchString) => {
        this.props.searchMovie(searchString);
    }

    onSearchStringChange = (event) => {
        let value = event.target.value;
        this.setState({ searchString: value });
        if (value !== "") {
            if (this.searchTimeoutHandle != null) {
                clearTimeout(this.searchTimeoutHandle);
            }
            this.searchTimeoutHandle = setTimeout(() => {
                this.searchMovie(value);
            }, 500);
        }
    }

    render() {
        let movies = this.props.movies ?? [];
        let searchResultContent = (movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} className="text-decoration-none" key={movie.id}>
                <div className="d-flex m-2 align-items-center shadow rounded">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg"
                        width="70" alt="poster"
                    />
                    <div className="w-100 align-self-start p-2">
                        <p><b>{movie.title}</b></p>
                        <p>{new Date(movie.release_date).getFullYear().toString()}</p>
                        <small className="py-0">
                            <span className="fa fa-play mr-2"></span>
                            {movie.trailers.length} Trailers
                            <span className="fa fa-photo ml-4 mx-2"></span>
                            {movie.images.length} Images
                    </small>
                    </div>
                    <p className="text-nowrap mb-0 mr-4">
                        <span className="fa fa-star text-primary"></span> {movie.average_user_rating}
                    </p>
                    <hr />
                </div>

            </Link>
        )));

        return (
            <div className={`${styles.searchbar} mx-2 d-flex align-items-center ${this.props.className}`}>
                <div className="input-group input-group-sm bg-transparent">
                    <div className="dropdown input-group-prepend">
                        <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            All
                            </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="/">Action</a>
                            <a className="dropdown-item" href="/">Another action</a>
                            <a className="dropdown-item" href="/">Something else here</a>
                        </div>
                    </div>
                    <input type="text"
                        className={`${styles.searchbarInput} form-control py-0`}
                        placeholder="Search" aria-label="search" aria-describedby="search field"
                        value={this.state.value}
                        onChange={this.onSearchStringChange}
                    />
                    <div className={`${styles.searchResults} position-absolute shadow-sm rounded bg-dark w-100 p-2`}>
                        <StatusBasedComponent
                            loadingText={"Loading..."}
                            status={this.props.status}
                            statusCode={this.props.statusCode}
                            statusText={this.props.statusText}
                            errorMessage={this.props.errorMessage}
                            spinnerSizeClass="fa-xs"
                            undefinedStatusText="Your search results will appear here."
                            className="text-white"
                        >
                            {searchResultContent}
                        </StatusBasedComponent>
                    </div>
                    <div className="input-group-append icon">
                        <button className="btn" disabled="disabled" >
                            <span className="fa fa-search"></span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        ...state.movies.search,
    }
};

const searchBarActions = ({
    searchMovie: movieActions.searchMovie,
});

export default connect(mapStateToProps, searchBarActions)(SearchBar);