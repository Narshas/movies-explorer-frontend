import React from "react";
import "./SearchForm.css";
import { useState } from "react";

export function SearchForm() {
    const [isActive, setIsActive] = useState(false);

    const handleToggleClick = () => {
        setIsActive(!isActive);
    }

    return(
        <form className="searchform">
            <div className="searchform__wraper">
                <input 
                    className="searchform__input"
                    placeholder="Фильм"
                />
                <button className="searchform__button">Найти</button>
            </div>
            <label className="searchform__toggle">
                <div className="searchform__toggle-styles"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </label>
        </form>
    );
}