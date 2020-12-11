import React, { Component } from 'react';
import logo from '../../logo.svg';
import AuthenticateUser from '../auth/AuthenticateUser';
import AccountNavButton from './AccountNavButton';
import SearchBar from './SearchBar';


class Header extends Component {
    render() {
        let accountNavButton = (
            <AuthenticateUser
                required={false}
                circularProgressIndicatorProps={{
                    height: "20px",
                    width: "20px"
                }}
            >
                <AccountNavButton />
            </AuthenticateUser>
        );
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
                                {accountNavButton}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;