import React from "react";
import image from "../assets/images/page-not-found.jpeg";
const NoPage = () => {
  const style = { background: "#fff", textAlign: "center" };

  return (
    <div style={style}>
      <div className="image-outer">
        <img src={image} alt="404" style={{maxWidth: '100%'}} />
      </div>
    </div>
  );
};

export default NoPage;
