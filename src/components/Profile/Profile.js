import { React, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import * as mainApi from "../../utils/MainApi";
import "./Profile.css";

export default function Profile({
  logout,
  setIsLoading,
  setCurrentUser,
  errorInfo,
  setErrorInfo,
  displayErrors,
}) {
  const currentUserContext = useContext(CurrentUserContext);
  const { email, name } = currentUserContext;

  const [update, setUpdate] = useState(false);
  const [edit, setEdit] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      email,
      name,
    });

  useEffect(() => {
    if (currentUserContext) resetForm(currentUserContext);
  }, [currentUserContext, resetForm]);

  useEffect(() => {
    if (values.name === name && values.email === email) {
      resetForm(values, {}, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  async function handleUpdateUser(user) {
    setIsLoading(true);
    try {
      const newUser = await mainApi.editInfoUser(user);
      setCurrentUser(newUser);
      setIsLoading(false);
      displayUpdateProfile();
    } catch (err) {
      displayErrors(err);
    } finally {
      setIsLoading(false);
    }
  }

  function displayUpdateProfile() {
    setUpdate(true);
    setTimeout(() => setUpdate(false), 1500);
  }

  function editActiv() {
    setEdit(true);
  }

  function editOff() {
    setEdit(false);
    resetForm();
    setErrorInfo("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values);
    editOff();
    setErrorInfo("");
  }

  return (
    <section className="profile">
      <p className="profile__title">
        {edit
          ? "Редактирование"
          : update
          ? "Профиль обновлен"
          : `Привет, ${name}`}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="profile__container">
          <div className="profile__name-container">
            <label htmlFor="name" className="profile__name">
              {errors.name ? errors.name : "Имя"}
            </label>
            <input
              className="profile__input"
              placeholder={edit ? name : name}
              id="name"
              name="name"
              type="name"
              minLength="2"
              maxLength="30"
              value={values.name ?? name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <span className="profile__line"></span>

        <div className="profile__container">
          <div className="profile__name-container">
            <label htmlFor="name" className="profile__name">
              {errors.email ? errors.email : "Email"}
            </label>
            <input
              pattern="\w+@\w+\.\w+"
              className="profile__input"
              placeholder={edit ? email : email}
              id="email"
              name="email"
              type="email"
              value={values.email ?? email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <span className="searchForm__span">{errorInfo}</span>
        <div className="profile__button">
          {edit ? (
            <>
              <button
                className={
                  !isValid
                    ? "profile__button-edit profile__button-edit_blocked"
                    : "profile__button-edit"
                }
                type="submit"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={editOff}
                className="profile__button-edit"
              >
                Отмена
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={editActiv}
              className="profile__button-edit"
            >
              Редактировать
            </button>
          )}
          <button
            type="button"
            onClick={logout}
            className="profile__button-escape"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}
