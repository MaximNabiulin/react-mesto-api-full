import React from 'react';

function SignForm(props) {
  const {name, title, buttonText, children, onSubmit } = props;

  return (
    <div className="auth">
      <h3 className="auth__title">{title}</h3>
      <form
        id={`${name}-form`}
        name={`${name}-form`}
        onSubmit={onSubmit}
        className="auth__form"
      >
        {children}
        <button
          id = "register-submit"
          type="submit"
          className="auth__submit-button"

        >
          {buttonText}
        </button>
      </form>
    </div>
  )
}

export default SignForm;
