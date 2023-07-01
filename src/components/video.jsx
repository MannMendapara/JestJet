import React from "react";
import ReactDOM from "react-dom";
// Css imports
import "./video.css";
import { Repeat } from "@material-ui/icons";

function video(props) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleScroll = (e) => {
    const next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    if(next){
      next.scrollIntoView()
      e.target.muted = true
    }
  };

  return (
    <video
      src={props.src}
      className="video-styling"
      muted="muted"
      autoPlay= {Repeat}
      onClick={handleClick}
      onEnded={handleScroll}
    ></video>
  );
}

export default video;
