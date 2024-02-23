import React from "react";
import LoadingSVG from "../assets/Dual Ball-1s-200px.svg";

function LoadingFullscreen({ loading, message = "Loading..." }) {
  return (
    <div className={`fullscreen-overlay ${loading ? "visible" : ""}`}>
      <div className="loading-cont animate__animated animate__flipInY">
        <img src={LoadingSVG}></img>
        <p style={{fontSize: '2em', textAlign: 'center', color: 'white'}}>{message}</p>
      </div>
    </div>
  );
}

export default LoadingFullscreen;
