import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authActions from '../../store/actions/authActions';


class AccountNavButton extends Component {
    signOut = () => {
        this.props.signOut(this.props.auth.authToken);
    }
    render() {
        let accountButton;
        if (this.props.auth.isAuthenticated) {
            accountButton = (
                <div className="btn-group">
                    <button className="btn btn-dark btn-sm dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                        <span className="fa fa-user-circle fa-lg mr-2"> </span>
                        {this.props.auth.user.first_name}
                    </button>
                    <div className="dropdown-menu bg-dark text-light menuWithHyperlinkItems">
                        <Link
                            className="dropdown-item"
                            to="/movie/wishlist/"
                        >
                            <span className="fa fa-bookmark mr-2"></span> Wish List
                        </Link>
                        <Link
                            className="dropdown-item"
                            to="/movie/owned/"
                        >
                            <span className="fa fa-play-circle mr-2"></span> My Orders
                        </Link>
                        <a
                            href="/"
                            className="dropdown-item mt-1"
                            onClick={this.signOut}>
                            <span className="fa fa-sign-out mr-2"></span> Sign Out
                        </a>
                    </div>
                </div>
            );
        }
        else {
            accountButton = (
                <Link
                    to={{
                        pathname: "/auth/signin",
                        state: {
                            nextUrl: this.props.location.pathname
                        }
                    }}
                    className="btn btn-dark text-nowrap">
                    Sign In
                </Link>
            );
        }
        return accountButton;
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const navBottomActions = ({
    signOut: authActions.signOut
});

export default withRouter(
    connect(mapStateToProps, navBottomActions)(AccountNavButton));