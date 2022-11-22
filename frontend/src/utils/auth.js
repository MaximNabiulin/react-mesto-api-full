// url для локальной увязки
// export const baseUrl = 'http://localhost:3001';

export const baseUrl = 'https://api.mesto.nabiulin.nomoredomains.icu';

// ---Закоментирован код для прокерки токена, в случае реализации без cookies---
const request = ({
  url,
  method = 'POST',
  // token,
  data,
}) => {
  return fetch (`${baseUrl}${url}`, {
    method,
    credentials: 'include', // в случае использования cookies
    headers: {
      'Content-Type': 'application/json',
      // ...!!token && { 'Authorization': `Bearer ${token}` },
    },
    ...!!data && {body: JSON.stringify(data)},
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    });
};

export const register = (password, email) => {
  return request({
    url: '/signup',
    data: { password, email }
  });
};

export const authorize = (password, email) => {
  return request({
    url: '/signin',
    data: { password, email }
  });
};

export const logout = () => {
  return request({
    url: '/signout',
    method: 'GET',
    // data: { email }
  });
};

// export const checkToken = (token) => {
//   return request({
//     url: '/users/me',
//     method: 'GET',
//     token,
//   });
// };

export const checkToken = () => {
  return request({
    url: '/users/me',
    method: 'GET',
  });
};