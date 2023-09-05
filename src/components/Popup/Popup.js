import React from "react";
import "./Popup.css";

export function Popup() {


    return(
        <div className={`popup`}>
            {/* ${isOpen ? "popup_active" : ""} */}
            <div className="popup__container">
                <button className="popup__close"></button>
                <p className="popup__text"></p>
            </div>
        </div>
    )
}