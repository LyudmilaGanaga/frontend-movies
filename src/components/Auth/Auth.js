import React from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

function Auth({
  authTitle,
  authInput,
  authButton,
  authChoice,
  onSubmit,
  errorInfo,
}) {
  
  return (
    <div className="auth">
      <Link to="/" className="header__logo">
        <img src={headerLogo} alt="Лого" />
      </Link>
      <p className="auth__title">{authTitle}</p>

      <form className="auth__form" onSubmit={onSubmit}>
        {authInput}

        <span className="auth__line">{errorInfo}</span>
        <button type="submit" className="auth__button-container">
          {authButton}
        </button>
      </form>
      {authChoice}
    </div>
  );
}

export default Auth;
