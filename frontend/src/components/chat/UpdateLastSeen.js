import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as chatActions from '../../store/actions/chatActions'

class UpdateLastSeen extends Component {
    componentDidMount() {
        this.props.updateLastSeen();
        this.intervalHandle = setInterval(
            () => {
                this.props.updateLastSeen();
            },
            this.props.interval ?? 60000
        );
    }

    componentWillUnmount() {
        if (this.intervalHandle)
            clearInterval(this.intervalHandle);
    }
    render() {
        return <span></span>;
    }
}

const mapStateToProps = (state) => {
    return {
        lastSeen: state.chat.lastSeen
    }
};

const lastSeenActions = {
    updateLastSeen: chatActions.updateLastSeen
};

export default connect(mapStateToProps, lastSeenActions)(UpdateLastSeen);