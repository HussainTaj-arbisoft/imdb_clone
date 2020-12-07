import React, { Component } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, A11y, Lazy } from 'swiper';
import FsLightbox from 'fslightbox-react';
import { connect } from 'react-redux'

import '../layout/css/swiperCustomizations.scss'
import * as movieActions from './../../store/actions/movieActions'
import Header from '../layout/Header';
import CircularProgressIndicator from '../layout/CircularProgressIndicator'

import parseTuple from '../../utilities/tuple'

SwiperCore.use([Lazy, Navigation, A11y]);

class MovieDetail extends Component {
    componentDidMount() {
        this.props.detailMovie(this.props.match.params.id)
    }
    state = {
        lightBoxToggler: false
    }
    setLightBoxToggler = (value) => {
        this.setState({ lightBoxToggler: value })
    }

    _renderDetail() {
        let movie = this.props.movieData;
        let crew = this.props.crewData;
        let images = movie.images.map((imageObj) => imageObj.image);
        return (
            <div className="container py-4 text-light">
                <div className="row bg-dark">
                    <div className="col-lg-8 col-md-12 p-0">
                        <Swiper
                            slidesPerView={1}
                            navigation
                            lazy
                        >
                            {movie.trailers.map((trailer) => (
                                <SwiperSlide key={trailer.id}>
                                    <ReactPlayer
                                        url={trailer.video}
                                        controls={true}
                                        className="w-100 h-100"
                                        key={trailer.id}
                                    />
                                    <h2 className="bg-dark px-2">{trailer.title}</h2>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-lg-4 col-md-12 bg-dark">
                        <div className="d-flex m-2">
                            <img src='https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg'
                                alt="poster"
                                width="100"
                            />
                            <div className="p-2">
                                <p className="font-weight-bold">{movie.title}</p>
                                <p className="text-secondary">{movie.tagline}</p>
                            </div>
                        </div>
                        <hr style={{ backgroundColor: "#333" }} />
                        <div>
                            <h2> Synopsis </h2>
                            <p>
                                {movie.synopsis}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row m-2">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => this.setLightBoxToggler(!this.state.lightBoxToggler)}>
                        <span className="fa fa-picture-o mr-2"> </span> View Images
                        </button>
                    <FsLightbox
                        toggler={this.state.lightBoxToggler}
                        type="image"
                        sources={images}
                    />
                </div>
                <div className="row m-4">
                    <h1 className="text-primary">Crew</h1>
                    <table className="table table-dark bg-dark table-borderless table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                crew.map(({ celebrity, id, role }) => (
                                    <tr key={id}>
                                        <td>
                                            <img src={celebrity.image} alt="Celebrity" width="50" height="50"
                                                style={{ objectFit: "cover", objectPosition: "top" }}
                                            />
                                        </td>
                                        <td className="align-middle">{celebrity.first_name} {celebrity.last_name}</td>
                                        <td className="align-middle">{parseTuple(role)[1]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    render() {
        let movie = this.props.detail;
        let status = this.props.status;
        let content;
        if (movie === undefined || status === undefined) {
            content = <p>Nothing to show yet.</p>;
        }
        if (status === "loading") {
            content = <CircularProgressIndicator bottomText="Loading..." />;
        }
        if (status === "error") {
            content = <p>{this.props.errorCode} {this.props.errorMessage}</p>;
        }
        if (status === "loaded") {
            content = this._renderDetail();
        }
        return (
            <div>
                <Header />
                {content}
            </div>
        );


    }
}

const mapStateToProps = (state) => {
    return {
        ...state.movies.detail
    }
};

const movieDetailListActions = ({
    detailMovie: movieActions.detailMovie,
});

export default connect(mapStateToProps, movieDetailListActions)(MovieDetail);