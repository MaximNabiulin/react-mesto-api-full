import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import SignForm from './SignForm';
import { useForm } from '../hooks/useForm';

function Register(props) {
  const { onRegister } = props;
  const {formValues, handleChange, setFormValues} = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {password, email} = formValues;

    onRegister(password, email)
      .then(() => {
        setFormValues({
          email: '',
          password: '',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register">
      <Header>
        <Link to="/sign-in" className="header__link">Войти</Link>
      </Header>

      <SignForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
            type="email"
            id="register-email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="auth__input"
          />
          <input
            type="password"
            id="register-password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="auth__input"
          />
      </SignForm>

      <div className="register__signin">
        <p className='register__text'>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__text register__login-link">Войти</Link>
      </div>
    </div>

  )
}

export default Register;