import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithFormComponent from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useEffect, useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getUserAndCards()
      .then(([userData, cardData]) => {
        setCards(cardData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => { 
        setCurrentUser(userData); 
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleCardDelete = (card) => {
    // используя методы массива, создаем новый массив карточек newCards, где не будет карточки, которую мы только что удалили
    api
      .deleteCardFromCloud(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleUpdateUser(name, description) {
    api
      .setUserInfo(name, description)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .addMyCardToCloud(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={(card) => setSelectedCard(card)}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={(card) => handleCardDelete(card)}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={(name, description) =>
            handleUpdateUser(name, description)
          }
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={(name, link) => handleAddPlaceSubmit(name, link)}
        />

        <PopupWithFormComponent
          name="delete-confirmation"
          title="Вы уверены?"
          isOpen=""
          onClose={closeAllPopups}
          buttonText="Да"
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={(link) => handleUpdateAvatar(link)}
        />

        <ImagePopup card={selectedCard} isOpen="" onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
