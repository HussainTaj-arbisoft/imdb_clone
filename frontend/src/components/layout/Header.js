import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../logo.svg';

import * as authActions from '../../store/actions/authActions';
import SearchBar from './SearchBar';


class Header extends Component {
    signOut = () => {
        this.props.signOut(this.props.auth.authToken);
    }
    render() {
        let accountButton;
        if (this.props.auth.isAuthenticated) {
            accountButton = (
                <div className="btn-group">
                    <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="fa fa-user-circle fa-lg mr-1"> </span> {this.props.auth.user.first_name}
                    </button>
                    <div className="dropdown-menu bg-dark">
                        <button className="dropdown-item btn btn-primary bg-dark text-light" onClick={this.signOut}>
                            <span className="fa fa-sign-out"></span> Sign Out
                        </button>
                    </div>
                </div>
            );
        }
        else {
            accountButton = (
                <Link to="/auth/signin" className="btn btn-dark text-nowrap">
                    Sign In
                </Link>
            );
        }
        return (
            <nav className="navbar navbar-dark navbar-expand-md bg-dark">
                <div className="container">
                    {/* Brand */}
                    <a className="navbar-brand d-none d-sm-block" href="/">
                        <img src={logo} alt="Logo" />
                    </a>

                    <div className="d-md-none flex-fill"><SearchBar /></div>

                    {/* Burger Icon */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <div className="navbar-nav d-flex w-100">
                            <div className="nav-item mx-2">
                                <button className="btn btn-dark text-nowrap">
                                    <span className="fa fa-bars align-middle"></span>
                                    <span className="ml-2 align-middle">Menu</span>
                                </button>
                            </div>
                            <div className="d-none d-md-block flex-fill pr-4">
                                <SearchBar className="w-100 h-100" />
                            </div>
                            <div className="nav-item mx-2 d-flex align-items-center">
                                {accountButton}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const headerActions = ({
    signOut: authActions.signOut
});

export default connect(mapStateToProps, headerActions)(Header);