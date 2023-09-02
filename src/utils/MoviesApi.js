export const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const getJson = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getInitialCards = () => {
  return fetch(`${MOVIES_URL}`, {}).then((res) => {
    return getJson(res);
  });
};
