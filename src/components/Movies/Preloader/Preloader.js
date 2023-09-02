import React from "react";
import "./Preloader.css";

const Preloader = ({isLoading }) => {
  return (
    <section className={isLoading ? "preloader": "preloader"}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </section>
  );
};

export default Preloader;
