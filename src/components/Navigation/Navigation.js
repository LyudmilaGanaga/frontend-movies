import React from "react";
import headerLogo from "../../images/logo.svg";
import AccPic from "../../images/account.svg";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/" className="header__logo">
        <img src={headerLogo} alt="Лого" />
      </Link>

      <div className="navigation__menu">
        <div className="navigation__box">
          <NavLink to="/movies" className="navigation__text">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className="navigation__text">
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink to="/profile" className="navigation__account">
          Аккаунт
          <div className="navigation__account-circle">
            <img
              className="navigation__account-pic"
              src={AccPic}
              alt="Иконка аккаунта"
            />
          </div>
        </NavLink>
      </div>
      <BurgerMenu />
    </nav>
  );
}

export default Navigation;
