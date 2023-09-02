export const BASE_URL = "https://pr-movies-explorer.nomoreparties.co";

function checkServer(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => {
    return checkServer(res);
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/api/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkServer(res);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkServer(res);
  });
};

export const getDataUser = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkServer(res);
  });
};

export const editInfoUser = (data) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/api/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => {
    return checkServer(res);
  });
};

// получить список всех карточек
export const getInitialMovies = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/api/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkServer(res);
  });
};

// сохранить карточку (POST)saveMovie
export const addCard = (movie) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/api/movies`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  }).then((res) => {
    return checkServer(res);
  });
};

// удалить карточку (DELETE)
export const deleteCard = (id) => {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return checkServer(res);
  });
};
