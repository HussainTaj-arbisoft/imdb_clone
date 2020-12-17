import React from "react";
import { connect } from "react-redux";

export default function withAuth(WrappedComponent) {
  let component = class extends React.Component {
    render() {
      return <WrappedComponent auth={this.props.auth} {...this.props} />;
    }
  };
  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

  return connect(mapStateToProps)(component);
}
