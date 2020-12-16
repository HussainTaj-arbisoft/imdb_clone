import React from "react";

export default function MessageBubble(props) {
  let msg = props.message;
  let isSender = msg.sender.id === props.senderId;
  let bubbleClass = isSender
    ? "align-self-end bg-dark text-light"
    : "align-self-start bg-primary text-dark";
  let msgDirectionClass = isSender ? "flex-row-reverse" : "flex-row";
  let timeString =
    new Date(msg.time).toLocaleTimeString() +
    " on " +
    new Date(msg.time).toLocaleDateString();
  return (
    <div className={`p-2 m-2 ${bubbleClass} card`}>
      <div className={`${msgDirectionClass} d-flex align-items-center`}>
        <img
          src={msg.sender.profile.image}
          alt="profile"
          height="40"
          width="40"
          style={{ objectFit: "cover", objectPosition: "top" }}
          className="rounded mx-1"
        />
        <div className="mx-1">
          <div
            className={`${
              isSender ? "flex-row-reverse" : ""
            } d-flex justify-content-between`}
          >
            <small>
              <b>
                {msg.sender.first_name} {msg.sender.last_name}
              </b>
            </small>
            <small className="text-muted mx-1">{timeString}</small>
          </div>
          <span>{msg.text}</span>
        </div>
      </div>
    </div>
  );
}
