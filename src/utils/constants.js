// URL 
export const BASE_URL = "https://pr-movies-explorer.nomoreparties.co";
export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

// роуты
export const MAIN_ROUTE = '/';

export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';
export const MOVIES = '/movies';
export const SAVED_MOVIES = '/saved-movies';
export const ERROR_404 = '*';
export const PROFILE = '/profile';



// Ошибки
export const ERROR_INFO = {
YOU_ENTERED_WRONG_LOGIN_OR_PASSWORD: "Вы ввели неправильный логин или пароль.",
USER_ALREADY_EXSISTS: "Пользователь с таким email уже существует",
SERVER_ERROR: "На сервере произошла ошибка.",
ACTION_ERROR: "При выполнении действия произошла ошибка.",

ERROR_DURING_QUERY: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
NOTHING_FOUND: "Ничего не найдено",

MOVIE_NAME_MUST_BE_ENTERED: "Необходимо ввести название фильма",
};


// данные из схемы
export const schemaFields = (movie) => {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    movieId: movie.id,
    trailerLink: movie.trailerLink,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
};

// информация о количестве карточек в на разных устройствах и в разных рядах
export const LG_INITIAL_CARD_COUNT_16 = 16;
export const MD_INITIAL_CARD_COUNT_6 = 6;
export const SM_INITIAL_CARD_COUNT_5 = 5;

export const LG_ROW_CARD_COUNT_4 = 4;
export const MD_ROW_CARD_COUNT_2 = 2;
export const SM_ROW_CARD_COUNT_2 = 2;
