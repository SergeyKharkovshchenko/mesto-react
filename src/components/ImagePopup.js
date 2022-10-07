import React, { useEffect, useState } from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup image-popup ${props.card.name ? "popup_opened" : ""}`}
    >
      <div className="image-popup__container" novalidate>
        <button
          onClick={props.onClose}
          className="popup__close image-popup__close"
          type="button"
        ></button>
        <img src={props.card.link} className="image-popup__foto" />
        <h2 className="image-popup__title"></h2>
      </div>
    </section>
  );
}

export default ImagePopup;
