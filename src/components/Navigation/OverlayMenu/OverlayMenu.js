import React from "react";
import { Link } from "react-router-dom";
import AccPic from "../../../images/account.svg";
import "../Navigation.css";
import "./OverlayMenu.css";
import {
  MAIN_ROUTE,
  MOVIES,
  SAVED_MOVIES,
  PROFILE,
} from "../../utils/constants";

function OverlayMenu() {
  return (
    <div className="overlayMenu">
      <button
        className="overlayMenu__close"
        type="button"
        aria-label="Close"
      ></button>

      <div className="overlayMenu__links">
        <Link to={MAIN_ROUTE} className="overlayMenu__link">
          <p className="overlayMenu__text">Главная</p>
        </Link>

        <Link to={MOVIES} className="overlayMenu__link">
          <p className="overlayMenu__text">Фильмы</p>
        </Link>

        <Link to={SAVED_MOVIES} className="overlayMenu__link">
          <p className="overlayMenu__text">Сохранённые фильмы</p>
        </Link>
      </div>

      <div className="overlayMenu__account">
        <Link to={PROFILE} className="navigation__account">
          Аккаунт
          <div className="navigation__account-circle">
            <img
              className="navigation__account-pic"
              src={AccPic}
              alt="Иконка аккаунта"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OverlayMenu;
