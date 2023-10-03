import React from "react";
import "./Popup.css";

export function Popup({ isOpen, popupText, onClose }) {


    return(
        <div className={`popup ${isOpen ? "popup_active" : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose} aria-label="закрыть попап"></button>
                <p className="popup__text">{popupText}</p>
            </div>
        </div>
    )
}