import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../MoviesCard/MoviesCard.css";

function MoviesCard({ movie, savedCard, onCardClick }) {
  const { pathname } = useLocation();
  const moviesPathname = pathname === "/movies";
  const savedMoviesPathname = pathname === "/saved-movies";

  function displayDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  }

  async function handleClick() {
    try {
      await onCardClick(movie);
    } catch (err) {
      console.log(`${err} ошибка в handleClick`);
    }
  }

  return (
    <li className="moviesCard">
      <Link to={movie.trailerLink} target="_blank">
        <img
          className="moviesCard__photo"
          src={
            movie.image?.url
              ? `https://api.nomoreparties.co${movie.image?.url}`
              : movie.image
          }
          alt={`Превью фильма ${movie.nameRU}`}
        />
      </Link>
      <div className="moviesCard__container">
        <h3 className="moviesCard__text">{movie.nameRU}</h3>

        <button
          type="button"
          onClick={handleClick}
          className={
            savedCard && moviesPathname
              ? "moviesCard__button-save_activ"
              : savedMoviesPathname
              ? "moviesCard__button-save_deleteBtn"
              : "moviesCard__button-save"
          }
        />
      </div>

      <h3 className="moviesCard__time">{displayDuration(movie.duration)}</h3>
    </li>
  );
}

export default MoviesCard;
