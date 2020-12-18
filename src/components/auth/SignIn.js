import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as authActions from "../../store/actions/authActions";
import logo from "../../logo.svg";
import CircularProgressIndicator from "../layout/CircularProgressIndicator";
import SocialButton from "./SocialButton";


class SignIn extends Component {
  state = {
    nextUrl: "/",
  };

  componentDidMount() {
    this.setState({ nextUrl: this.props.location.state?.nextUrl ?? "/" });
  }

  componentDidUpdate(prevProps) {
    let nextUrlProp = this.props.location.state?.nextUrl;
    if (nextUrlProp && nextUrlProp !== this.state.nextUrl) {
      this.setState({ nextUrl: nextUrlProp });
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    this.props.signIn(values["email"], values["password"]);
  };
  _renderForm = () => {
    if (this.props.isSigningIn) {
      return <CircularProgressIndicator bottomText="Signing In..." />;
    }
    return (
      <div>
        <Form>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
          </label>
            <Field
              id="email"
              name="email"
              placeholder="someone@example.com"
              type="email"
              className="form-control form-control-sm"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
          </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control form-control-sm"
              required="required"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Sign In
          </button>
          </div>
          {this.props.status ? this._renderStatusCodeMessage() : null}
          <div className="text-center mt-2">
            <Link to="/auth/signup" className="text-info">
              Don't have an account? Create new.
          </Link>
          </div>

        </Form>
        <SocialButton
          provider='facebook'
          appId='412133589934206'
          onLoginSuccess={this.fbResponse}
          onLoginFailure={(e) => console.log(e)}
          button="facebook"
        />
        <SocialButton
          provider='google'
          appId='745121207429-rjumns38f3ksr6ahprmja5ks5tn0puni.apps.googleusercontent.com'
          onLoginSuccess={this.googleResponse}
          onLoginFailure={(e) => console.log(e)}
          button="google"
        />
      </div>
    );
  };
  fbResponse = (response) => {
    this.props.socialSignIn(response._token.accessToken, "facebook");
  }
  googleResponse = (response) => {
    this.props.socialSignIn(response._token.accessToken, "google");
  }

  _renderStatusCodeMessage = () => {
    switch (this.props.status) {
      case 200:
        return null;
      case 400:
        return (
          <div className="text-danger text-center pt-4">
            Email or password was incorrect.
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.state.nextUrl} />;
    }

    const initialFormValues = {
      email: "",
      password: "",
    };

    return (
      <div className="container p-4">
        <div className="text-center">
          <Link to="/">
            <img src={logo} alt="logo" className="center-block" height="50" />
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 col-12">
            <div className="card m-4 p-4">
              <div className="card-bdoy">
                <div className="text-center">
                  <h1 className="display-6">Sign In</h1>
                </div>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={this.onSubmit}
                >
                  {this._renderForm()}
                </Formik>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-2"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth.signIn,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const signInActions = {
  signIn: authActions.signIn,
  socialSignIn: authActions.socialSignIn
};

export default connect(mapStateToProps, signInActions)(SignIn);
