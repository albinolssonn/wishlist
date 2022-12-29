import React from "react";
import "../Assets/ButtonStyle.css";

const AdComponent = () => {
  return (
    <div
      className="profileBanner"
      style={{
        position: "absolute",
        top: "0",
        background: "#ffffff",
        height: "43px",
        width: "100%",
        zIndex: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="ad-content-container">
        <p>Testannons!</p>
      </div>
    </div>
  );
};

export default AdComponent;
