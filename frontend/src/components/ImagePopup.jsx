import React from 'react';
// import Popup from './Popup';

// TODO: переделать верстку чтобы коректно использовать компонент-обертку 'Popup'

function ImagePopup(props) {
  const { card, onClose} = props;
  const isOpen = Object.keys(card).length !== 0;

  // Временный useEffect для обработчика закрытия клавишей Esc
  React.useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
}, [isOpen, onClose])

// Временный обработчик закрытия кликом по оверлею
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

  return (
    <div
      className={ `popup popup_type_image-view ${isOpen && 'popup_opened'}` }
      onClick={handleOverlay}
      >
      <figure className="popup__image-container">
        <button
          id = "view-close"
          type="button"
          className="popup__close-button"
          onClick={onClose}
          >
        </button>
        <img src={card.link} alt={card.name} className="popup__image"/>
        <figcaption className="popup__image-caption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;