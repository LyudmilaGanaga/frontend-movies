import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  
  const navigate = useNavigate();

  // setTimeout(() => {
  //   navigate(-1)
  // }, 2000);

  
  return (
    <section className="error">
      <div className="error__container">
        <h2 className="error__heading">404</h2>
        <p className="error__paragraph">Страница не найдена</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="error__button-back"
      >
        Назад
      </button>
    </section>
  );
}

export default NotFound;
