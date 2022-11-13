import React from "react";

// Компонент для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children }) => {
// useEffect для обработчика закрытия клавишей Esc
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

// Обработчик закрытия кликом по оверлею
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

// Возвращение разметки обертки любого попапа
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
     <div className={`popup__content popup__content_${name}`}>
        <button
          id ={`${name}-close-button`}
          type='button'
          className='popup__close-button'
          onClick={onClose}
          />
        {children}
      </div>
    </div>
  );
};

export default Popup;