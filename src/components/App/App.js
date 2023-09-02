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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedFilms, setSavedFilms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // ошибка для логина, регистрации и профиля
  function displayErrors(err) {
    switch (err) {
      case "Ошибка: 401":
        setErrorInfo("Вы ввели неправильный логин или пароль.");
        break;
      case "Ошибка: 409":
        setErrorInfo("Пользователь с таким email уже существует");
        break;
      case "Ошибка: 500":
        setErrorInfo("На сервере произошла ошибка.");
        break;

      default:
        setErrorInfo("При выполнении действия произошла ошибка.");
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
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
      <div className="app">
        {loggedIn ? (
          <Navigation />
        ) : pathname === "/sign-up" ? null : pathname === "/sign-in" ? null : (
          <NavTab />
        )}
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/sign-in"
            element={
              loggedIn ? (
                <Navigate to={"/movies"} />
              ) : (
                <Login
                  setIsLoading={setIsLoading}
                  setLoggedIn={setLoggedIn}
                  errorInfo={errorInfo}
                  displayErrors={displayErrors}
                />
              )
            }
          />

          <Route
            path="/sign-up"
            element={
              loggedIn ? (
                <Navigate to={"/movies"} />
              ) : (
                <Register
                  setIsLoading={setIsLoading}
                  setLoggedIn={setLoggedIn}
                  setCurrentUser={setCurrentUser}
                  errorInfo={errorInfo}
                  displayErrors={displayErrors}
                />
              )
            }
          />

          <Route
            path="/movies"
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
            path="/saved-movies"
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
            path="/profile"
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
