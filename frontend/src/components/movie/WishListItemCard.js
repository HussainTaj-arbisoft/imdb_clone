import React from "react";
import RemoveFromWishListButton from "./RemoveFromWishListButton";

export default function WishListItemCard(props) {
  let movie = props.movie;
  if (!movie) return <span>No Data Provided.</span>;
  return (
    <div
      className={`card bg-dark my-4 ${props.className}`}
      style={{
        background: `URL(${movie.cover_image}) center`,
        border: "0",
      }}
    >
      <div
        className="d-flex"
        style={{
          backgroundColor: "rgba(0,0,0,0.9)",
        }}
      >
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
        <div className="ml-auto d-flex justify-content-end">
          {props.removeable ? (
            <RemoveFromWishListButton wishListId={props?.wishListId} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
