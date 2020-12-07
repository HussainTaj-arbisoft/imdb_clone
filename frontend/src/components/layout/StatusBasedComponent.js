import React from 'react';

import CircularProgressIndicator from './CircularProgressIndicator';

export default function StatusBasedComponent(props) {
    switch (props.status) {
        case "loading":
            return <CircularProgressIndicator bottomText={props.loadingText} />
        case "error":
            return (
                <div className="text-center">
                    <h1>{props.statusCode} {props.statusText}</h1>
                    <p>{props.errorMessage}</p>
                </div>
            );
        case "loaded":
            return props.children;
        default:
            return (<p>Status Undefined</p>)
    }
}
