import React from 'react';

import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onLoad, onAddPlace } = props;
  const {formValues, handleChange, setFormValues} = useForm({ name: '', link: '' });

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: formValues.name,
      link: formValues.link
    });
  }

  React.useEffect(() => {
    setFormValues({ name: '', link: '' });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-place"
      title="Новое Место"
      buttonText={onLoad ? "Сохранить..." : "Создать" }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="place-name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        className="popup__input popup__place-name"
      />
      <span className="place-name-error popup__error-span"></span>
      <input
        type="url"
        id="place-image-link"
        name="link"
        value={formValues.link}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
        className="popup__input popup__place-image"
      />
      <span className="place-image-link-error popup__error-span"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;