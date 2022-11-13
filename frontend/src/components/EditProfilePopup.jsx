import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onLoad, onUpdateUser } = props;

  const currentUser = React.useContext(CurrentUserContext);

  // TODO: сделать рефакторинг обработки инпутов под кастомный хук
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText={onLoad ? "Сохранить..." : "Сохранить" }
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name-edit"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        className="popup__input popup__profile-name"
      />
      <span className="name-edit-error popup__error-span"></span>
      <input
        type="text"
        id="aboutself-edit"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        className="popup__input popup__profile-aboutself"
      />
      <span className="aboutself-edit-error popup__error-span"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;