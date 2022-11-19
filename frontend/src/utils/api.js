import {baseUrl} from './auth.js';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData);
  }

  // ---- ПОЛЬЗОВАТЕЛЬ -----------------------------
  // 1. Загрузка информации о пользователе с сервера

  getUserInfoFromApi() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      // headers: this._headers
    });
  }

  // 3. Редактирование профиля

  editUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  // 9. Обновление аватара пользователя

  editUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    });
  }

// ---- КАРТОЧКИ -----------------
// 2. Загрузка карточек с сервера

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
      // headers: this._headers
    });
  }

  // 4. Добавление новой карточки

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      // headers: this._headers,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
  }

  // 7. Удаление карточки

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      // headers: this._headers
    });
  }

  // 8. Постановка и снятие лайка

  setlike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      // headers: this._headers
    });
  }

  removeLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      // headers: this._headers
    });
  }

}

const api = new Api({
  baseUrl: baseUrl,
  // credentials: 'include',
  // headers: {
  //   authorization: '9fd8f809-2b73-494b-91df-a3deb101ee29',
  //   'Content-Type': 'application/json'
  // }
});

export default api;