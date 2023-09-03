import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import * as mainApi from "../../utils/MainApi";
import "./Register.css";
import Auth from "../Auth/Auth";

export default function Register({
  setIsLoading,
  setLoggedIn,
  errorInfo,
  displayErrors,
}) {
  const navigate = useNavigate();

  async function handleRegister({ name, email, password }) {
    setIsLoading(true);
    try {
      const res = await mainApi.register(name, email, password);
      if (res) {
        handleRedirect({ email, password });
      }
    } catch (err) {
      displayErrors(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRedirect({ email, password }) {
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        displayErrors(err);
      });
  }

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    email: "",
    password: "",
    name: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <Auth
      authTitle={"Добро пожаловать"}
      onSubmit={handleSubmit}
      method="POST"
      isValid={isValid}
      errorInfo={errorInfo}
      authInput={
        <>
          <label htmlFor="name" className="auth__name">
            Имя
          </label>
          <input
            noValidate
            placeholder="Введите имя"
            className="auth__input"
            id="name"
            name="name"
            type="name"
            minLength="2"
            maxLength="40"
            value={values?.name || ""}
            onChange={handleChange}
          />

          <span className="auth__line">{errors.name}</span>

          <label htmlFor="name" className="auth__name">
            E-mail
          </label>
          <input
            noValidate
            pattern="\w+@\w+\.\w+"
            className="auth__input"
            placeholder="Введите e-mail"
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
            className="auth__input"
            placeholder="Введите пароль"
            id="password"
            name="password"
            type="password"
            value={values?.password || ""}
            onChange={handleChange}
            required
          />
        </>
      }
      authButton={"Зарегистрироваться"}
      authChoice={
        <p className="auth__signin">
          Уже зарегистрированы?
          <Link to="/sign-in" className="auth__login-link">
            Войти
          </Link>
        </p>
      }
    />
  );
}
