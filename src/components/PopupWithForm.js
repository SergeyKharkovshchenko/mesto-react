import React, { useEffect, useState } from "react";

function PopupWithForm({
  name,
  isOpen,
  buttonText,
  children,
  title,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen}`}>
      <form
        className={`popup__container popup__form-${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <fieldset className={`popup__set popup__set${name}`} name="AddForm">
          <button
            onClick={onClose}
            className={`popup__close popup__close_type_${name}`}
            type="button"
          />
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__submit-button popup__submit-button_type-${name}`}
            // disabled
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default PopupWithForm;
