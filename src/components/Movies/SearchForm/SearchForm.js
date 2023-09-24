import React from "react";
import "./SearchForm.css";
import { useState } from "react";

export function SearchForm(props) {
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isFilmTouched, setIsFilmTouched] = useState('type what you would like to find');
    const { handleSearch, searchQuery, handleToggle, handleSearchButtonClick } = props;

    return(
        <form className="searchform" onSubmit={e => e.preventDefault()}>
            <div className="searchform__wraper">
                <input 
                    className="searchform__input"
                    placeholder="Фильм"
                    required
                    onChange={e => handleSearch(e.target.value)}
                    type="text"
                    value={searchQuery}

                />
                <button type="button" className="searchform__button" onClick={handleSearchButtonClick}>Найти</button>
            </div>
            <div className={`searchform__toggle ${isToggleActive ? "searchform__toggle-on" : "searchform__toggle-off" }`} onClick={handleToggle}>
                <div className="searchform__toggle-switcher"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
            
        </form>
    );
}