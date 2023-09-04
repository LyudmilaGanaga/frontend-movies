import { React, useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Navigation from "../Navigation/Navigation";
import NavTab from "../Main/NavTab/NavTab";
import NotFound from "../NotFound/NotFound";
import { ERROR_INFO } from "../../utils/constants";
import {
  MAIN_ROUTE,
  ERROR_404,
  SIGN_IN,
  SIGN_UP,
  MOVIES,
  SAVED_MOVIES,
  PROFILE,
} from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedFilms, setSavedFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ошибка для логина, регистрации и профиля
  function displayErrors(err) {
    switch (err) {
      case "Ошибка: 401":
        setErrorInfo(ERROR_INFO.YOU_ENTERED_WRONG_LOGIN_OR_PASSWORD);
        break;
      case "Ошибка: 409":
        setErrorInfo(ERROR_INFO.USER_ALREADY_EXSISTS);
        break;
      case "Ошибка: 500":
        setErrorInfo(ERROR_INFO.SERVER_ERROR);
        break;

      default:
        setErrorInfo(ERROR_INFO.ACTION_ERROR);
        console.log(err);
    }
  }

  // реализация сброса ошибок, которые появлялись раньше
  useEffect(() => {
    if (currentUser) {
      setErrorInfo("");
    }
  }, [currentUser, navigate]);

  async function checkToken() {
    if (token) {
      try {
        const res = await mainApi.checkToken(token);
        if (res) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.log(`Ошибка в App: ${err.status}`);
      }
    }
  }

  // токен
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi.getDataUser().then((user) => {
        setIsLoading(false);
        setCurrentUser(user);
      });
      mainApi
        .getInitialMovies()
        .then((res) => {
          setSavedFilms(res);
        })
        .catch((err) => {
          console.log(`Ошибка в App: ${err.status}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn]);

  // удаление карточки
  async function handleCardDelete(movie) {
    try {
      await mainApi.deleteCard(movie._id);
      setSavedFilms((cards) =>
        cards.filter((savedMovie) => savedMovie._id !== movie._id)
      );
    } catch (err) {
      console.log(`Ошибка в App: ${err}`);
    }
  }

  // лайк - сохранить фильм
  async function handleCardLike(movie) {
    try {
      const savedMovie = await mainApi.addCard(movie);
      if (savedMovie) {
        setSavedFilms((movies) => [...movies, savedMovie]);
      }
    } catch (err) {
      console.log(`Ошибка: ${err}`);
    }
  }

  // выход
  function handleLogout() {
    localStorage.removeItem("token");

    localStorage.removeItem("searchQuery");
    localStorage.removeItem("switchCheckbox");
    localStorage.removeItem("searchMoviesList");

    setLoggedIn(false);
    navigate(MAIN_ROUTE);
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
      <div className="app">
        {loggedIn ? (
          <Navigation />
        ) : pathname === SIGN_UP ? null : pathname === SIGN_IN ? null : (
          <NavTab />
        )}
        <Routes>
          <Route path={MAIN_ROUTE} element={<Main loggedIn={loggedIn} />} />
          <Route path={ERROR_404} element={<NotFound />} />
          <Route
            path={SIGN_IN}
            element={
              loggedIn ? (
                <Navigate to={MOVIES} />
              ) : (
                <Login
                  setIsLoading={setIsLoading}
                  setLoggedIn={setLoggedIn}
                  errorInfo={errorInfo}
                  displayErrors={displayErrors}
                  isLoading={isLoading}
                />
              )
            }
          />

          <Route
            path={SIGN_UP}
            element={
              loggedIn ? (
                <Navigate to={MOVIES} />
              ) : (
                <Register
                  setIsLoading={setIsLoading}
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                  errorInfo={errorInfo}
                  displayErrors={displayErrors}
                  isLoading={isLoading}
                />
              )
            }
          />

          <Route
            path={MOVIES}
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Movies}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                savedFilms={savedFilms}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
            }
          />

          <Route
            path={SAVED_MOVIES}
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                onCardDelete={handleCardDelete}
                savedFilms={savedFilms}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path={PROFILE}
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                setIsLoading={setIsLoading}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                errorInfo={errorInfo}
                setErrorInfo={setErrorInfo}
                logout={handleLogout}
                displayErrors={displayErrors}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
