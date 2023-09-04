import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { MOVIES_URL } from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import "../../Movies/MoviesCardList/MoviesCardList.css";
import {
  LG_INITIAL_CARD_COUNT_16,
  MD_INITIAL_CARD_COUNT_6,
  SM_INITIAL_CARD_COUNT_5,
  LG_ROW_CARD_COUNT_4,
  MD_ROW_CARD_COUNT_2,
  SM_ROW_CARD_COUNT_2,
} from "../../../utils/constants";

import {
  MOVIES
} from "../../../utils/constants";

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

  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT_4
    : isTablet
    ? MD_ROW_CARD_COUNT_2
    : SM_ROW_CARD_COUNT_2;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT_16
    : isTablet
    ? MD_INITIAL_CARD_COUNT_6
    : SM_INITIAL_CARD_COUNT_5;

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
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT_4);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT_2);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT_2);
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
        {visibleCardCount < foundMovies?.length && pathname ===  MOVIES ? (
          <button onClick={handleClick} className="showMore__button">
            Ещё
          </button>
        ) : null}
      </div>
    </>
  );
}

export default MoviesCardList;
