import React, { useState } from "react";
import "./BurgerMenu.css";
import burgermenuLogo from "../../../images/burger.svg";
import burgermenuButtonClose from "../../../images/close.svg";
import AccPic from "../../../images/account.svg";
import "../Navigation.css";
import { Link } from "react-router-dom";

function OverlayMenu() {
  const [menuIsActive, setMenuIsActive] = useState(false);

  return (
    <div className="burgerMenu">
      {!menuIsActive && (
        <div className="burgerMenu__state-notactive">
          <button
            className="burgerMenu__button"
            onClick={() => setMenuIsActive((prev) => setMenuIsActive(!prev))}
          >
            <img
              className="burgerMenu__img"
              src={burgermenuLogo}
              alt="Иконка бургер меню"
            />
          </button>
        </div>
      )}

      {menuIsActive && (
        <div className="burgerMenu__overlay">
          <div className="burgerMenu__state-active">
            <button
              className="burgerMenu__close"
              onClick={() => setMenuIsActive((prev) => setMenuIsActive(!prev))}
            >
              <img src={burgermenuButtonClose} alt="Иконка закрытия" />
            </button>
            <nav className="burgerMenu__links">
              <Link className="burgerMenu__link" to="/">
                Главная
              </Link>
              <Link
                className="burgerMenu__link burgerMenu__link_active"
                to="/movies"
              >
                Фильмы
              </Link>
              <Link className="burgerMenu__link" to="/saved-movies">
                Сохранённые фильмы
              </Link>
            </nav>
            <nav>
              <Link
                to="/profile"
                className="navigation__account burgerMenu__account-show"
              >
                Аккаунт
                <div className="navigation__account-circle">
                  <img
                    className="navigation__account-pic"
                    src={AccPic}
                    alt="Иконка аккаунта"
                  />
                </div>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverlayMenu;
