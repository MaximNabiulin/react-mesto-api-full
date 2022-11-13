import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `place__delete-button ${isOwn ? 'place__delete-button_visible' : 'place__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `${isLiked ? 'place__like-button_active' : 'place__like-button'}`;


  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }


  return (
    <div className="place">
      <div className="place__image-frame">
        <img
          src={card.link}
          alt={card.name}
          className="place__image"
          onClick={handleCardClick}
        />
        <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        >
        </button>
      </div>
      <div className="place__caption">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          >
          </button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
