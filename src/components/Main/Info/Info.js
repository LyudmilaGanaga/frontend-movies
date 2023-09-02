import React from "react";
import "../Info/Info.css";

function Info({ infoHeading, infoLine }) {
  return (
    <div className="info">
      <h2 className="info__heading">{infoHeading}</h2>
      <span className="info__line"></span>
      {infoLine}
    </div>
  );
}

export default Info;
