import React from "react";
import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function SearchForm({
    handleSearchButton,
    filterShortMovies,
    isToggleActive,
    setIsToggleActive,

    searchQuery, setSearchQuery,
    allMovies, foundMovies,
}) {
    const location = useLocation();
    const [isErr, setIsErr] = useState("");

    useEffect(() => {
        if (localStorage.getItem('searchQuery') && location.pathname === '/movies') {
            const newQuery = localStorage.getItem('searchQuery');
            setSearchQuery(newQuery);
        }
    }, [location])
    

    const handleSearch = () => {
        if (!searchQuery.length) {
            setIsErr(true);
        } else {
            handleSearchButton(searchQuery);
            setIsErr(false);
        }
    }

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        if (foundMovies) {
            filterShortMovies(foundMovies)
        } else {
            filterShortMovies(allMovies)
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSearch()
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
                    value={searchQuery || ''}
                    onKeyUp={handleEnter}

                />
                <button type="button" className="searchform__button" onClick={handleSearch}>Найти</button>
            </div>
            <div className={`searchform__toggle ${isToggleActive ? "searchform__toggle-on" : "searchform__toggle-off" }`} onClick={handleToggle}>
                <div className="searchform__toggle-switcher"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </div>
            {isErr && <div>{'Нужно ввести ключевое слово'}</div>}
            
        </form>
    );
}