import "./Movies.css";
import { React, useEffect, useState } from "react";
import SearchForm from "./SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import SearchError from "../Movies/SearchForm/SearchError";
import * as moviesApi from "../../utils/MoviesApi";
import { schemaFields } from '../../utils/constants';

function Movies({
  setIsLoading,
  savedFilms,
  onCardDelete,
  onCardLike,
  isLoading,
}) {
  //список фильмов из поиска
  const storageMovies =
    JSON.parse(localStorage.getItem("searchMoviesList")) ?? [];
  const [searchMoviesList, setSearchMoviesList] = useState(storageMovies);
  //переключатель
  const storageCheckbox =
    JSON.parse(localStorage.getItem("switchCheckbox")) ?? false;
  const [flitredByCheckbox, setFlitredByCheckbox] = useState(storageCheckbox);
  //поисковый запрос
  const storageSearchQuery = localStorage.getItem("searchQuery") ?? "";
  const [searchQuery, setSearchQuery] = useState(storageSearchQuery);

  const [error, setError] = useState(false);
  const [moviesList, setMoviesList] = useState(null);

  useEffect(() => {
    localStorage.setItem("searchMoviesList", JSON.stringify(searchMoviesList));
    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("switchCheckbox", flitredByCheckbox);
  }, [searchMoviesList, flitredByCheckbox, searchQuery]);


  async function getCards() {
    setError(false);
    setIsLoading(true);
    try {
      let movie = await moviesApi.getInitialCards();
      movie = movie.map(schemaFields);
      setMoviesList(movie);
      setIsLoading(false);
    } catch {
      console.log("Ошибка в App");
      setError(true);
    } finally {
      setIsLoading(false);
      setError(false);
    }
  }

  function searchFilms(movies, searchText, filteredFilms) {
    if (!movies.length) return movies;
    let foundFilms = movies;

    if (filteredFilms) {
      foundFilms = foundFilms.filter((movie) => movie.duration <= 40);
    }

    foundFilms = foundFilms.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchText.toLowerCase())
    );

    return foundFilms;
  }

  useEffect(() => {
    if (moviesList) {
      const foundFilms = searchFilms(
        moviesList,
        searchQuery,
        flitredByCheckbox
      );
      setSearchMoviesList(foundFilms);
    }
  }, [moviesList, searchQuery, flitredByCheckbox]);

  function handleSearch({ searchQuery, filteredFilms }) {
    setSearchQuery(searchQuery);
    setFlitredByCheckbox(filteredFilms);
    if (!moviesList) getCards();
  }

  function switchCheckbox(value) {
    setFlitredByCheckbox(value);
    if (!moviesList) getCards();
  }

  async function handleCardClick(movie) {
    const savedCard = savedFilms.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (savedCard) {
      const savedMovie = savedFilms.find(
        (savedMovie) => savedMovie.movieId === movie.movieId
      );
      await onCardDelete(savedMovie);
    } else {
      await onCardLike(movie);
    }
  }

  return (
    <main className="moviesPage">
      <SearchForm
        handleSearch={handleSearch}
        switchCheckbox={switchCheckbox}
        storageSearchQuery={searchQuery}
        storageCheckbox={flitredByCheckbox}
      />

      {searchQuery && (
        <SearchError
          foundMovies={searchMoviesList}
          savedFilms={savedFilms}
          onCardClick={handleCardClick}
          error={error}
          isLoading={isLoading}
        />
      )}

      <Footer />
    </main>
  );
}

export default Movies;
