import React from "react";
import { Link } from "react-router-dom";
import "../layout/css/common.scss";
import AddToWishListButton from "./AddToWishListButton";

export default function MoviePosterCard(props) {
  return (
    <Link to={`/movie/${props.movie.id}`} className="hyperlinkCard">
      <div className="card text-white bg-dark">
        <img
          className="card-img-top"
          src={props.movie.poster_image}
          alt="Card cap"
          width="10px"
        />
        <div className="card-body">
          <span className="fa fa-star text-primary"> </span>
          <span> {props.movie.average_user_rating} </span>
          <h5 className="card-title text-truncate" title={props.movie.title}>
            {props.movie.title}
          </h5>
          <AddToWishListButton movieId={props.movie.id} />
          <div className="d-flex justify-content-between pt-2">
            <button className="btn text-light">
              <span className="fa fa-play pr-1"></span>
              <span> Trailer</span>
            </button>
            <button className="btn text-light">
              <span className="fa fa-info-circle"></span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
