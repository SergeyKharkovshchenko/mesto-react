import React, { Component, useEffect, useState } from "react";
import avaPen from "../images/avatar_pen.svg";
import api from "../utils/Api";
import Card from "./Card";

function Main({onEditAvatar, onAddPlace, onEditProfile, onCardClick}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getUserAndCards()
      .then((argument) => {
        const [dataFromGetUserInfoPromis, dataFromGetInitialCardsPromise] =
          argument;
        setUserName(dataFromGetUserInfoPromis.name);
        setUserDescription(dataFromGetUserInfoPromis.about);
        setUserAvatar(dataFromGetUserInfoPromis.avatar);
        setCards(dataFromGetInitialCardsPromise);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main className="main">
      {/* <!-- блок профиль --> */}

      <section className="profile">
        <div className="profile__data">
          <button
            onClick={onEditAvatar}
            className="profile__card"
            type="button"
          >
            <img
              src={`${userAvatar}`}
              className="юзерпик профиля"
              alt="аватар"
            />
            <img
              src={avaPen}
              alt="Изображение карандаша для редактирования"
              className="profile__hoverImg"
            />
          </button>

          <div className="profile__profile-info">
            <div className="profile__info-first-line">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
              >
                {" "}
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>

        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
        ></button>
      </section>

      {/* <!-- блок элементы --> */}

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={(card) => {
                onCardClick(card);
              }}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
