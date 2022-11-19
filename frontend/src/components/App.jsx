import React from 'react';
import {
  Route,
  Switch,
  // withRouter,
  useHistory
} from 'react-router-dom';

import registerOk from '../images/registration_ok.svg';
import errorImg from '../images/auth_error.svg'

// подключаем объект контекста
import { CurrentUserContext } from '../context/CurrentUserContext';

// импортируем компоненты приложения
import Header from './Header';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';


function App() {
  // Стейт переменные открытия попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isRegisterOkTooltipOpen, setIsRegisterOkTooltipOpen] = React.useState(false);
  const [isErrorTooltipOpen, setIsErrorTooltipOpen] = React.useState(false);

  // Стэйт переменныя для данных пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // Стэйт переменные для карточек
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState({});

  // Стейт переменная для индикаторов загрузки запросов на сервер
  const [isLoading, setIsLoading] = React.useState(false);

  // Стэйт переменные для регистрации и авторизации
  const [isLoggedIn, setIsLoggedIn] = React.useState({ loggedIn: false });
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  // Загружаем данные о пользователе и начальный массив карточек
  React.useEffect(() => {
    Promise.all([api.getUserInfoFromApi(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // --- ОБРАБОТЧИКИ КНОПОК ОТКРЫТИЯ И ЗАКРЫТИЯ ПОПАПОВ ---

  // Попап изменения аватарки профиля
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  };

  // Попап редактирования данных профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // Попап добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Попап подтверждения удаления карточки
  function handleDeleteCardBtnClick(card) {
    setCardToDelete(card);
    setIsDeleteCardPopupOpen(true);
  };

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setIsRegisterOkTooltipOpen(false);
    setIsErrorTooltipOpen(false);
  };

  // --- ОБРАБОТЧИКИ ЗАПРОСОВ ---
  // Обработчик обновления данных профиля
  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api.editUserInfo(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Обработчик обновления Аватара профиля
  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api.editUserAvatar(currentUser)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Обработчик клика по изображению карточки (попап с увеличением изображения)
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  // обработчик постановки и удаления лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const action = isLiked
      ? api.removeLike(card._id)
      : api.setlike(card._id);

    action
      .then(newCard => {
        setCards((state) =>
          state.map((item) => item._id === card._id ? newCard : item)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обработчик удаления карточки
  function handleDeleteCard(card) {
      api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // --- АУТЕНТИФИКАЦИЯ ---

  // Обработчик авторизации
  function handleLogin(password, email) {
    return auth.authorize(password, email)
      .then((data) => {
        if (!data.token) {
          return Promise.reject(`Ошибка: ${data.status}`);
        }
        history.push('/');
        setEmail(email);
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(oldState => ({ ...oldState, loggedIn: true }));
      })
      .catch((err) => {
        console.log(err);
        setIsErrorTooltipOpen(true);
      })
  };

  // Обработчик регистрации
  function handleRegister(password, email) {
    return auth.register(password, email)
      .then(() => {
        setIsRegisterOkTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsErrorTooltipOpen(true);
      })
  };

  // Обработчик выхода из аккаунта
  function handleLogout() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  // Проверка авторизации
  React.useEffect(() => {
    if (!isLoggedIn.loggedIn) return;
    history.push('/')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn.loggedIn]);

  // Проверка наличия токена
  React.useEffect(() => {
    // setIsLoading(true);
    function checkToken() {
      const jwt = localStorage.getItem('jwt');
      if (!jwt) return;

      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn({ loggedIn: true });
            // setIsLoading(false);
            history.push('/');
          }
        })
        .catch((err) => {
          // setIsLoading(false);
          console.log(err)
        });
    }

    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Возвращаем разметку
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Switch>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <ProtectedRoute
              path="/"
              loggedIn={isLoggedIn.loggedIn}
            >
              <Header>
                <div className='header__content'>
                  <p className="header__user-email">{email}</p>
                  <button
                    id="logout"
                    onClick={handleLogout}
                    className="header__button"
                    >
                      Выйти
                  </button>
                </div>
              </Header>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                cards={cards}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardBtnClick}
              />
            </ProtectedRoute>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onLoad={isLoading}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          card={cardToDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title="Вы успешно зарегистрировались!"
          name="register-ok"
          image={registerOk}
          isOpen={isRegisterOkTooltipOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title="Что-то пошло не так! Попробуйте ещё раз."
          name="auth-error"
          image={errorImg}
          isOpen={isErrorTooltipOpen}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
// export default withRouter(App);
