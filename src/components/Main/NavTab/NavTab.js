import React from "react";
import { NavLink } from "react-router-dom";
import Header from "../../Header/Header";
import "./NavTab.css";

function NavTab() {
  return (
    <Header
      headerNavTab={
        <nav className="navTab">
          <NavLink
            to="/sign-up"
            // className={({ isActive }) =>
            //   `navTab__registration navTab_text ${
            //     isActive ? "navTab_active" : ""
            //   }`
            // }
            className="navTab__registration navTab_text"
          >
            Регистрация
          </NavLink>
          <NavLink
            to="/sign-in"
            // className={({ isActive }) =>
            //   `navTab__login navTab_text ${isActive ? "navTab_active" : ""}`
            // }
            className="navTab__login navTab_text"
          >
            Войти
          </NavLink>
        </nav>
      }
    />
  );
}

export default NavTab;
