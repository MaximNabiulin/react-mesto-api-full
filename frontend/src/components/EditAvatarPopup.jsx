import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onLoad, onUpdateAvatar } = props;

  const avatarLinkInput = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLinkInput.current.value,
    });
  }

  return (
    <PopupWithForm
          name="avatar-edit"
          title="Обновить аватар"
          buttonText={onLoad ? "Сохранить..." : "Сохранить" }
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            id="avatar-edit"
            name="avatar"
            ref={avatarLinkInput}
            placeholder="Ссылка на картинку"
            required
            className="popup__input popup__profile-avatar"
          />
          <span className="avatar-edit-error popup__error-span"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;