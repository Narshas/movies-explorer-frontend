import React from "react";
import "./SearchForm.css";
import { useState } from "react";

export function SearchForm() {
    const [isActive, setIsActive] = useState(false);
    const [isFilmEdited, setIsFilmEdited] = useState('type what you would like to find');
    

    const handleToggle = () => {
        setIsActive(!isActive);
    }

    return(
        <form className="searchform" onSubmit={e => e.preventDefault()}>
            <div className="searchform__wraper">
                <input 
                    className="searchform__input"
                    placeholder="Фильм"
                />
                <button type="button" className="searchform__button">Найти</button>
            </div>
            <div className={`searchform__toggle ${isActive ? "searchform__toggle-on" : "searchform__toggle-off" }`} onClick={handleToggle}>
                <div className="searchform__toggle-switcher"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
            
        </form>
    );
}