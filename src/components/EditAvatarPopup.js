import PopupWithForm from "./PopupWithForm";
import React, { useRef } from "react";

function EditAvatarPopup(props) {
  const textInput = useRef(null);
  function handleLinkChange() {
    textInput.current.focus();
    console.log(textInput.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    {
      props.onUpdateAvatar(textInput.current.value);
    }
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="url"
        name="link"
        id={`avatar-name`}
        className={`popup__field popup__field-for-name popup__field-for-name_type_avatar`}
        minLength={2}
        required
        placeholder="Ссылка на аватар"
        onChange={handleLinkChange}
        ref={textInput}
      />
      <span className={`popup__error avatar-name-error`} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
