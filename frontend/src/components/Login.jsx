import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

const initValues = {
  email: '',
  password: '',
}

function Login(props) {
  const { onLogin } = props;
  const {formValues, handleChange, setFormValues} = useForm(initValues);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {password, email} = formValues;
    if (!password || !email) return;

    onLogin(password, email)
      .then(() => {
        setFormValues(initValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login">
      <Header>
        <Link to="/sign-up" className="header__link">Регистрация</Link>
      </Header>

      <SignForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit}
      >
        <input
            type="email"
            id="login-email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="auth__input"
          />
          <input
            type="password"
            id="login-password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="auth__input"
          />
      </SignForm>
    </div>
  );
}

export default Login;