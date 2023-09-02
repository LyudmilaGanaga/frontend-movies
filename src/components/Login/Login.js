import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Auth from "../Auth/Auth";
import "./Login.css";
import "../Register/Register.css";
import * as mainApi from "../../utils/MainApi";

export default function Login({
  setLoggedIn,
  setIsLoading,
  errorInfo,
  displayErrors,
}) {
  const navigate = useNavigate();

  async function handleLogin({ email, password }) {
    setIsLoading(true);
    try {
      const res = await mainApi.login(email, password);
      setIsLoading(false);
      localStorage.setItem("token", res.token);
      setLoggedIn(true);
      navigate("/movies");
    } catch (err) {
      displayErrors(err);
    } finally {
      setIsLoading(false);
    }
  }

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values);
  }

  return (
    <Auth
      authTitle={"Рады видеть"}
      onSubmit={handleSubmit}
      isValid={isValid}
      errorInfo={errorInfo}
      authInput={
        <>
          <label htmlFor="email" className="auth__name">
            E-mail
          </label>
          <input
            noValidate
            placeholder="Ваш e-mail"
            className="auth__input"
            id="email"
            name="email"
            type="email"
            value={values?.email || ""}
            onChange={handleChange}
          />
          <span className="auth__line">{errors.email}</span>

          <label htmlFor="name" className="auth__name">
            Пароль
          </label>
          <input
            noValidate
            className="auth__input"
            placeholder=""
            id="password"
            name="password"
            type="password"
            value={values?.password || ""}
            onChange={handleChange}
          />
          <span className="auth__line">{errors.password}</span>
        </>
      }
      authButton={"Войти"}
      authChoice={
        <p className="auth__signin">
          Еще не зарегистрированы?
          <Link to="/sign-up" className="auth__login-link">
            Регистрация
          </Link>
        </p>
      }
    />
  );
}
