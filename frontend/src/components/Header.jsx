import React from 'react';
import logo from '../images/logo.svg';
// import { Route, Switch, withRouter } from 'react-router-dom';


// TODO: избавиться от children, и сделать отрисовывку определенного контента под определенный путь
function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo"/>
      <div className="header__auth">
        {props.children}
        {/* <Route exact path="/">
          <div className="header__content">
            <p className="header__user-email">{email}</p>
            <button
              id="logout"
              onClick={handleLogout}
              className="header__button"
            >
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link className="header__link" to="sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link className="header__link" to="sign-up">
            Регистрация
          </Link>
        </Route> */}
      </div>
    </header>
  );
}

export default Header;