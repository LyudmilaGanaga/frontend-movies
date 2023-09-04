import { React, useState, useEffect } from "react";
import "../SearchForm/SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox.js";
import useForm from "../../../hooks/useForms";
import { ERROR_INFO } from "../../../utils/constants";

function SearchForm({
  handleSearch,
  switchCheckbox,
  storageSearchQuery,
  storageCheckbox,
}) {
  const standartValues = {
    searchQuery: storageSearchQuery,
    filteredFilms: storageCheckbox,
  };
  const [values, isValid, handleChange] = useForm(
    standartValues,
    !!storageSearchQuery
  );
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (values.filteredFilms !== storageCheckbox) {
      switchCheckbox(values.filteredFilms);
    }
  }, [values.filteredFilms, switchCheckbox, storageCheckbox]);

  useEffect(() => {
    if (isValid) {
      setErrorText("");
    }
  }, [isValid]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) {
      setErrorText(ERROR_INFO.MOVIE_NAME_MUST_BE_ENTERED);
      return;
    }
    handleSearch(values);
  }

  return (
    <section className="searchForm">
      <form onSubmit={handleSubmit} className="searchForm__form">
        <input
          noValidate
          placeholder="Фильм"
          className="searchForm__input"
          value={values.searchQuery}
          type="text"
          id="film"
          name="searchQuery"
          onChange={handleChange}
        />

        <div className="searchForm__button-box">
          <button type="submit" className="searchForm__button">
            Найти
          </button>
          <span className="searchForm__line"></span>
        </div>

        <FilterCheckbox
          name="filteredFilms"
          checked={values.filteredFilms}
          onChange={handleChange}
        />
      </form>
      <span className="searchForm__line-error">{errorText}</span>

      <span className="searchForm__container-line"></span>
    </section>
  );
}

export default SearchForm;
