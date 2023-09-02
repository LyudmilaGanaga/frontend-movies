import { React, useState, useEffect } from "react";
import SearchError from "../Movies/SearchForm/SearchError";
import SearchForm from "../Movies/SearchForm/SearchForm";
import Footer from "../Footer/Footer";

function SavedMovies({ onCardDelete, savedFilms }) {
  const [searchMoviesList, setSearchMoviesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [flitredByCheckbox, setFlitredByCheckbox] = useState(false);

  useEffect(() => {
    if (savedFilms) {
      const foundMovies = searchFilms(
        savedFilms,
        searchQuery,
        flitredByCheckbox
      );
      setSearchMoviesList(foundMovies);
    }
  }, [savedFilms, searchQuery, flitredByCheckbox]);

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

  async function handleCardClick(movie) {
    const savedCard = savedFilms.find(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    await onCardDelete(savedCard);
  }

  function handleSearch({ searchQuery, filteredFilms }) {
    setSearchQuery(searchQuery);
    setFlitredByCheckbox(filteredFilms);
  }

  function switchCheckbox(value) {
    setFlitredByCheckbox(value);
  }

  return (
    <section className="moviesPage">
      <SearchForm
        handleSearch={handleSearch}

        switchCheckbox={switchCheckbox}
        storageSearchQuery={searchQuery}
        storageCheckbox={flitredByCheckbox}
      />
      <SearchError
        foundMovies={searchMoviesList}
        savedFilms={savedFilms}
        onCardClick={handleCardClick}
      />

      <Footer />
    </section>
  );
}

export default SavedMovies;
