import React from 'react';
import Popup from './Popup';

function PopupWithForm(props) {
  const { title, name, buttonText, children, isOpen, onClose, onSubmit} = props;

  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
    >
          <h3 className="popup__title">{title}</h3>
          <form
            id={`${name}-form`}
            name={`${name}-form`}
            onSubmit={onSubmit}
            className="popup__form"
            >
            {children}
            <button
              id = {`${name}-submit`}
              type="submit"
              className="popup__submit-button"
              >
              {buttonText}
            </button>
          </form>
      </Popup>
  )
}

export default PopupWithForm;