import React, { useEffect, useState } from "react";

function PopupWithForm(props) {

  return (
<>
{
<section className={`popup popup_${props.name} ${props.isOpen}`}>
    <form className={`popup__container popup__form-${props.name}`} novalidate>
        <fieldset className={`popup__set popup__set${props.name}`} name="AddForm">
            <button onClick={props.onClose} className={`popup__close popup__close_type_${props.name}`} type="button"/>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
            <button type="submit" className={`popup__submit-button popup__submit-button_type-${props.name}`}
                disabled>Сохранить</button>
        </fieldset>
    </form>
</section>
}
</>
);
}

export default PopupWithForm;

