import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StatusBasedComponent from "../layout/StatusBasedComponent";
import withAuth from "../auth/withAuth";

class BuyMovieButton extends Component {
  state = {
    status: "loading",
    owned: "no",
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      axios
        .post("/api/payments/user_owns_movie/", {
          movie_id: this.props.movieId,
        })
        .then((response) => {
          let owned = JSON.parse(response.data).owned;
          this.setState({ owned: owned, status: "loaded" });
        })
        .catch(({ response }) => {
          this.setState({
            status: "error",
            statusText: response.statusText,
            statusCode: response.status,
          });
        });
    }
  }

  render() {
    if (!this.props.auth.isAuthenticated) {
      return (
        <button disabled="disabled" className="btn btn-primary">
          Sign In to Buy
        </button>
      );
    }
    let innerComponent;
    if (this.state.owned === "no") {
      innerComponent = (
        <Link
          to={`/payment/checkout/${this.props.movieId}`}
          className="btn btn-primary m-2"
        >
          Buy
        </Link>
      );
    } else if (this.state.owned === "yes") {
      innerComponent = (
        <button disabled="disabled" className="btn btn-primary">
          Owned
        </button>
      );
    } else {
      innerComponent = <p>status undefined</p>;
    }
    return (
      <StatusBasedComponent
        status={this.state.status}
        statusCode={this.state.statusCode}
        statusText={this.state.statusText}
        errorMessage="No connection"
        circularProgressIndicatorProps={{
          height: "20px",
          width: "20px",
        }}
      >
        {innerComponent}
      </StatusBasedComponent>
    );
  }
}

export default withAuth(BuyMovieButton);
