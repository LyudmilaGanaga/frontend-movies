import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function DisplayError({ error }) {
  return <p className="erroMessage">{error}</p>;
}

function SearchError({
  isLoading,
  foundMovies,
  savedFilms,
  onCardClick,
  error,
}) {
  return error ? (
    <DisplayError
      error="Во время запроса произошла ошибка. Возможно, проблема с 
    соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
    />
  ) : isLoading ? (
    <Preloader />
  ) : foundMovies.length === 0 ? (
    <DisplayError error="Ничего не найдено" />
  ) : (
    <MoviesCardList
      foundMovies={foundMovies}
      savedFilms={savedFilms}
      onCardClick={onCardClick}
    />
  );
}

export default SearchError;
