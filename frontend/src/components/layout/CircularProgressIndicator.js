import React from "react";
import { ReactComponent as AnimatedIcon } from "./icon/CirularProgressIndicatorAnimatedIcon.svg";

export default function CircularProgressIndicator(props) {
  let height = props.height ?? "50px";
  let width = props.width ?? "50px";
  let bottomText = props.bottomText ? <p>{props.bottomText}</p> : null;
  return (
    <div
      className={`${props.className} w-100 h-100 d-flex flex-column justify-content-center align-items-center`}
    >
      <AnimatedIcon style={{ height, width }} className="fa-spin" />
      {bottomText}
    </div>
  );
}
