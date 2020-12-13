import React from 'react'
import { Link } from 'react-router-dom'
import { timeBetweenDatesText } from './utilities';
import '../layout/css/common.scss'

export default function UserContactCard(props) {
    let user = props.user;
    return (
        <Link to={{
            pathname: `/chat/user/${user.id}`,
            state: {
                userId: user.id
            }
        }}
            key={user.id}
            className="hyperlinkCard"
        >
            <div className="card bg-dark my-3">
                <div className="d-flex">
                    <img
                        src={user.profile.image}
                        className="rounded"
                        alt="profile"
                        width="100px"
                        height="100px"
                        style={{
                            objectFit: "cover",
                            overflow: "hidden",
                            objectPosition: "top"
                        }}
                    />
                    <div className="d-flex flex-column px-4 justify-content-center">
                        <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                        <p className="card-text my-0">{user.email}</p>
                        <p className="card-text my-0">
                            <small className="text-muted">
                                Last seen {timeBetweenDatesText(new Date(user.last_seen))} ago.
                                    </small>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
