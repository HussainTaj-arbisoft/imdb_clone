import React from 'react'

export default function CircularProgressIndicator(props) {
    return (
        <div>
            <div className="text-center">
                <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw text-primary"></i>
                <p>{props.bottomText}</p>
            </div>
        </div>
    )
}
