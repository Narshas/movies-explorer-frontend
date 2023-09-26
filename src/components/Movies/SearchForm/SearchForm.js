import React from "react";
import "./SearchForm.css";
import { useState } from "react";

export function SearchForm({searchMovies, searchQuery, setSearchQuery,isToggleActive, filterShortMovies}) {
    
    const [isFilmTouched, setIsFilmTouched] = useState('type what you would like to find');
    const [input, setInput] = useState("");

    const handleSearch = (e) => {
        searchMovies(query, isToggleActive);
    }

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        if (foundMovies) {
            filterShortMovies(foundMovies)
        } else {
            filterShortMovies(allMovies)
        }
        
    }

    return(
        <form className="searchform" onSubmit={e => e.preventDefault()}>
            <div className="searchform__wraper">
                <input 
                    className="searchform__input"
                    placeholder="Фильм"
                    required
                    onChange={e => setSearchQuery(e.target.value)}
                    type="text"
                    value={searchQuery}
                    onKeyUp={if (event.key === "Enter") {handleSearch}}

                />
                <button type="button" className="searchform__button" onClick={handleSearch}>Найти</button>
            </div>
            <div className={`searchform__toggle ${isToggleActive ? "searchform__toggle-on" : "searchform__toggle-off" }`} onClick={handleToggle}>
                <div className="searchform__toggle-switcher"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
            
        </form>
    );
}