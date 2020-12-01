import React from 'react'

import logo from '../../logo.svg'
import styles from './css/Header.module.scss'


export default function Header() {
    return (
        <nav className="navbar navbar-dark navbar-expand-md bg-dark">
            <div className="container">
                {/* Brand */}
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="Logo" />
                </a>

                {/* Burger Icon */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <div className="navbar-nav d-flex w-100">
                        {/* Menu */}
                        <div className="nav-item mx-2">
                            <button className="btn btn-dark text-nowrap">
                                <span className="fa fa-bars align-middle"></span>
                                <span className="ml-2 align-middle">Menu</span>
                            </button>
                        </div>

                        {/* Searchbar */}
                        <div className={`${styles.searchbar} nav-item w-100 mx-2 align-middle d-flex align-items-center`}>
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
                                <input type="text" className="form-control py-0" placeholder="Search" aria-label="search" aria-describedby="search field"></input>
                                <div className="input-group-append icon">
                                    <button className="btn" disabled="disabled" >
                                        <span className="fa fa-search"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sign In */}
                        <div className="nav-item mx-2">
                            <button className="btn btn-dark text-nowrap">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
