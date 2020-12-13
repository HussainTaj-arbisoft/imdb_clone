import React from 'react'

export default function CelebrityCard(props) {
    return (
        <div className="text-light text-center">
            <img
                src={props.imageUrl}
                alt={props.name}
                className="rounded-circle mb-2"
                height='150'
                width='150'
                style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
            <h3>{props.name}</h3>
            <p>{props.age}</p>
        </div>
    )
}
