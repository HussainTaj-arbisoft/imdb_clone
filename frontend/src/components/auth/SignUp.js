import React, { Component } from 'react'
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


import * as authActions from '../../store/actions/authActions';
import logo from '../../logo.svg';
import CircularProgressIndicator from '../layout/CircularProgressIndicator';


class SignUp extends Component {
    onSubmit = (values, { setSubmitting }) => {
        this.props.signUp(
            values['firstName'],
            values['lastName'],
            values['email'],
            values['password'],
            values['rePassword']
        );
    }
    _displayFieldErrorIfExists(fieldName) {
        if (this.props.fieldErrors && this.props.fieldErrors[fieldName]) {
            let keyCounter = 0;
            return (
                <ul className="list-unstyled">
                    {
                        this.props.fieldErrors[fieldName].map((errorMessage) => (
                            <li className="text-danger" key={keyCounter++}>
                                <small>{errorMessage}</small>
                            </li>
                        ))
                    }
                </ul>
            );
        }
    }
    _renderForm = () => {
        if (this.props.isSigningUp) {
            return <CircularProgressIndicator bottomText="Signing Up..." />
        }
        return (
            <Form>
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <Field
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        type="text"
                        className="form-control form-control-sm"
                        required="required"
                    />
                    {this._displayFieldErrorIfExists("first_name")}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <Field
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        type="text"
                        className="form-control form-control-sm"
                        required="required"
                    />
                    {this._displayFieldErrorIfExists("last_name")}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="someone@example.com"
                        type="email"
                        className="form-control form-control-sm"
                        required="required"
                    />
                    {this._displayFieldErrorIfExists("email")}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                        id="password"
                        name="password"
                        type="password"
                        className="form-control form-control-sm"
                        required="required"
                    />
                    {this._displayFieldErrorIfExists("password")}
                </div>
                <div className="form-group">
                    <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                    <Field
                        id="rePassword"
                        name="rePassword"
                        type="password"
                        className="form-control form-control-sm"
                        required="required"
                    />
                    {this._displayFieldErrorIfExists("re_password")}
                </div>
                {this._displayFieldErrorIfExists("non_field_errors")}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
                {
                    this.props.status ? (
                        this._renderStatusCodeMessage()
                    ) :
                        (null)
                }
                <div className="text-center mt-2">
                    <Link to="/auth/signin" className="text-info">
                        Already have an account? Sign in.
                    </Link>
                </div>
            </Form>
        )
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
                return this.props.statusText;
        }
    }

    render() {
        if (this.props.isAuthenticated)
            return <Redirect to="/" />

        const initialFormValues = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            rePassword: ''
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
                                    <h1 className="display-6">Sign Up</h1>
                                </div>
                                <Formik
                                    initialValues={initialFormValues}
                                    onSubmit={this.onSubmit}>
                                    {this._renderForm()}
                                </Formik>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ...state.auth.signUp,
        isAuthenticated: state.auth.isAuthenticated
    }
};

const signUpActions = ({
    signUp: authActions.signUp,
});

export default connect(mapStateToProps, signUpActions)(SignUp);