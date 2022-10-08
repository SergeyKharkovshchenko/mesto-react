import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithFormComponent from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import React, { useEffect, useState } from "react";

function App() {
  const [isEditProfilePopupOpen, SetEditProfilePopupOpen] =
    React.useState(null);
  const [isAddPlacePopupOpen, SetAddPlacePopupOpen] = React.useState(null);
  const [isEditAvatarPopupOpen, SetEditAvatarPopupOpen] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(false);
  

  function handleEditAvatarClick() {
    SetEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    SetEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    SetAddPlacePopupOpen(true);
  }

  function closeAllPopups(){
    SetEditAvatarPopupOpen(null);
    SetEditProfilePopupOpen(null);
    SetAddPlacePopupOpen(null);
    setSelectedCard(false);
  }

  return (
    <div className="App">
      <body className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={(card) => setSelectedCard(card)}
        />
        <Footer />

        <PopupWithFormComponent
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen ? "popup_opened" : ""
          }
          onClose={closeAllPopups}
          buttonText = "Сохранить"
        >
          <input
            name="name"
            type="text"
            id={`edit-name`}
            className={`popup__field popup__field-for-name popup__field-for-name_type_edit`}
            minLength={2}
            maxlength={40}
            required
            placeholder={`Имя`}
          />
          <span className={`popup__error edit-name-error`}></span>
          <input
            name="description"
            type="text"
            id={`edit-job`}
            className={`popup__field popup__field-for-job popup__field-for-job_type_edit`}
            minLength={2}
            maxlength={200}
            required
            placeholder="Описание"
          />
          <span className={`popup__error edit-job-error`}></span>
        </PopupWithFormComponent>
        <PopupWithFormComponent
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
          buttonText = "Создать"
        >
          <input
            type="text"
            name="name"
            id={`add-name`}
            className={`popup__field popup__field-for-name popup__field-for-name_type_add`}
            minLength={2}
            maxlength={30}
            required
            placeholder="Название"
          />
          <span className={`popup__error add-name-error`}></span>
          <input
            type="url"
            name="link"
            id={`add-job`}
            className={`popup__field popup__field-for-job popup__field-for-job_type_add`}
            required
            placeholder="Ссылка на картинку"
          />
          <span className={`popup__error add-job-error`}></span>
        </PopupWithFormComponent>
        <PopupWithFormComponent
          name="delete-confirmation"
          title="Вы уверены?"
          isOpen=""
          onClose={closeAllPopups}
          buttonText = "Да"
        />
        <PopupWithFormComponent
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
          onClose={closeAllPopups}
          buttonText = "Сохранить"
        >
          <input
            type="url"
            name="link"
            id={`avatar-name`}
            className={`popup__field popup__field-for-name popup__field-for-name_type_avatar`}
            minLength={2}
            required
            placeholder="Ссылка на аватар"
          />
          <span className={`popup__error avatar-name-error`} />
        </PopupWithFormComponent>

        <ImagePopup
          card={selectedCard}
          isOpen=""
          onClose={closeAllPopups}
        />
      </body>
    </div>
  );
}

export default App;



      