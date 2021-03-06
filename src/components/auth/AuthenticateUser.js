import { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

import * as authActions from "../../store/actions/authActions";
import CircularProgressIndicator from "../layout/CircularProgressIndicator";

class AuthenticateUser extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) this.props.signInWithTokenCookie();
  }

  render() {
    if (this.props.auth.isAuthenticated === true) return this.props.children;

    // props.required is considered to be true by default.
    if (
      this.props.auth.signInWithTokenFailed === true &&
      this.props.required !== false
    ) {
      return (
        <Redirect
          to={{
            pathname: "/auth/signin",
            state: {
              nextUrl: this.props.location.pathname,
            },
          }}
        />
      );
    }

    let circularProgressIndicatorProps = this.props
      .circularProgressIndicatorProps;
    let progressIndicator = (
      <CircularProgressIndicator {...circularProgressIndicatorProps} />
    );
    if (this.props.auth.signIn.isSigningIn === true) {
      return progressIndicator;
    }

    if (this.props.required === false) return this.props.children;

    return (
      <p className="text-center text-light">
        <span>
          Sorry, this feature is only for signed in users. To sign in{" "}
        </span>

        <Link
          to={{
            pathname: "/auth/signin",
            state: {
              nextUrl: this.props.location.pathname,
            },
          }}
        >
          <u>click here.</u>
        </Link>
      </p>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const signInRequiredActions = {
  signInWithTokenCookie: authActions.signInWithTokenCookie,
};

export default withRouter(
  connect(mapStateToProps, signInRequiredActions)(AuthenticateUser)
);
