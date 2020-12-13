import React from 'react'

export default function MessageBubble(props) {
    let msg = props.message;
    let bubbleClass = (
        msg.sender.id === props.senderId
            ? "align-self-end bg-dark text-light"
            : "align-self-start bg-primary text-dark");
    let msgDirectionClass = (
        msg.sender.id === props.senderId
            ? "flex-row-reverse"
            : "flex-row");
    return (
        <div className={`p-2 m-2 ${bubbleClass} card`}>
            <div className={`${msgDirectionClass} d-flex align-items-center`}>
                <img src={msg.sender.profile.image} alt="profile" height="40" width="40"
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    className="rounded mx-1"
                />
                <div className="mx-1">
                    <small>{msg.sender.first_name} {msg.sender.last_name}</small><br />
                    <span>{msg.text}</span>
                </div>
            </div>
        </div>
    );
}
