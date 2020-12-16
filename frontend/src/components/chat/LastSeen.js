import React from "react";
import { timeBetweenDatesText, isDateInLastSeconds } from "./utilities";

export default function LastSeen(props) {
  let lastSeen;
  if (isDateInLastSeconds(new Date(props.user.last_seen), 70)) {
    lastSeen = (
      <small style={{ color: "green" }}>
        <span className="fa fa-circle fa-xs"> </span> online
      </small>
    );
  } else {
    lastSeen = (
      <small className="text-muted">
        Last seen {timeBetweenDatesText(new Date(props.user.last_seen))} ago.
      </small>
    );
  }
  return lastSeen;
}
