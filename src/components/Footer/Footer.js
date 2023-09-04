import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <span className="footer__line"></span>
      <div className="footer__container">
        <p className="footer__year">&copy;&nbsp;{new Date().getFullYear()}</p>
        <div className="footer__links">
          <Link
            to="https://practicum.yandex.ru/"
            target="_blank"
            className="footer__link"
          >
            Яндекс.Практикум
          </Link>
          <Link
            to="https://github.com/LyudmilaGanaga"
            target="_blank"
            className="footer__link"
          >
            Github
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
