import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { MOVIES_URL } from "../../../utils/MoviesApi";
import MoviesCard from "../MoviesCard/MoviesCard";
import "../../Movies/MoviesCardList/MoviesCardList.css";

function MoviesCardList({
  setIsLoading,
  savedFilms,
  onCardClick,
  foundMovies,
}) {
  function savedCard(movie) {
    return savedFilms.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
  }
  // eslint-disable-next-line no-unused-vars
  const [cards, setCards] = useState(null);
  const { pathname } = useLocation();

  const LG_INITIAL_CARD_COUNT = 16;
  const MD_INITIAL_CARD_COUNT = 6;
  const SM_INITIAL_CARD_COUNT = 5;

  const LG_ROW_CARD_COUNT = 4;
  const MD_ROW_CARD_COUNT = 2;
  const SM_ROW_CARD_COUNT = 2;

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] = useState(initialCardCount);

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  useEffect(() => {
    fetch(MOVIES_URL)
      .then((response) => response.json())
      .then((card) => setCards(card));
  }, []);

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  return (
    <>
      <ul className="moviesList">
        {foundMovies?.slice(0, roundedVisibleCardCount).map((movie) => {
          return (
            <MoviesCard
              setIsLoading={setIsLoading}
              onCardClick={onCardClick}
              movie={movie}
              key={movie.movieId}
              savedCard={savedCard(movie)}
            />
          );
        })}
      </ul>

      <div className="showMore">
        {visibleCardCount < foundMovies?.length && pathname === "/movies" ? (
          <button onClick={handleClick} className="showMore__button">
            Ещё
          </button>
        ) : null}
      </div>
    </>
  );
}

export default MoviesCardList;
