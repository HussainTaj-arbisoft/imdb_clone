import React from 'react'

export default function CircularProgressIndicator(props) {
    return (
        <div className={props.className}>
            <div className="text-center">
                <i
                    className={`${props.sizeClass ?? "fa-3x"} fa fa-circle-o-notch fa-spin fa-fw text-primary`}
                ></i>
                <p>{props.bottomText}</p>
            </div>
        </div>
    )
}
