import SocialLogin from 'react-social-login'
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";


import React, { Component } from 'react'

class SocialButton extends Component {
    render() {
        switch (this.props.button) {
            case "facebook":
                return (<FacebookLoginButton
                    onClick={this.props.triggerLogin}
                    align="center"
                    {...this.props} />);
            case "google":
                return (<GoogleLoginButton
                    onClick={this.props.triggerLogin}
                    align="center"
                    {...this.props} />);
            default:
                return <p>No button specified.</p>;
        }
    }
}

export default SocialLogin(SocialButton);