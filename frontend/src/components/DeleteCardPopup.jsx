import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  const { card, isOpen, onClose, onDeleteCard } = props;

  function handleSubmit(e) {
    e.preventDefault();

    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeleteCardPopup;