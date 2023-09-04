import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { ERROR_INFO } from "../../../utils/constants";

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
      error={ERROR_INFO.ERROR_DURING_QUERY}
    />
  ) : isLoading ? (
    <Preloader />
  ) : foundMovies.length === 0 ? (
    <DisplayError error={ERROR_INFO.NOTHING_FOUND} />
  ) : (
    <MoviesCardList
      foundMovies={foundMovies}
      savedFilms={savedFilms}
      onCardClick={onCardClick}
    />
  );
}

export default SearchError;
