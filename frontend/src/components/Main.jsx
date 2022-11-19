import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {
  const {onEditAvatar, onEditProfile, cards, onAddPlace, onCardClick, onCardLike, onCardDelete} = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar"/>
          <button
            id = "avatar-button"
            type="button"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}>
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__name-row">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              id = "edit-button"
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}>
            </button>
          </div>
          <p className="profile__about-self">{currentUser.about}</p>
        </div>
        <button
          id = "add-button"
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}>
        </button>
      </section>

      <section className="places">
        {cards.map((card) => {
          return (
            <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;