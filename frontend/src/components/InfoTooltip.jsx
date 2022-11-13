import React from 'react';
import Popup from './Popup';

function InfoTooltip(props) {
  const {title, name, image, isOpen, onClose} = props;

  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
    >
      <img
        src={image}
        alt={name}
        className="auth__image"
        />
      <h3 className="popup__title popup__title_tooltip">{title}</h3>
    </Popup>
  )
}

export default InfoTooltip;