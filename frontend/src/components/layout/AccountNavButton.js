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
                        <span className="fa fa-user-circle fa-lg mr-1"> </span>
                        {this.props.auth.user.first_name}
                    </button>
                    <div className="dropdown-menu bg-dark">
                        <button
                            className="dropdown-item btn btn-primary bg-dark text-light"
                            onClick={this.signOut}>
                            <span className="fa fa-sign-out"></span> Sign Out
                        </button>
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