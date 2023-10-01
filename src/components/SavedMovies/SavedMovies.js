import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
import { Preloader } from "../Movies/Preloader/Preloader";

export function SavedMovies({savedMovies, loggedIn, handleLike}) {
    const [searchError, setSearchError] = useState('');
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [filtredSavedtMovies, setFiltredSavedMovies] = useState([]);
    const [localQuery, setLocalQuery] = useState('');

    useEffect(() => {
        searchMovies(savedMovies, localQuery, isToggleActive)
    }, [savedMovies, localQuery, isToggleActive])

    function transferSerchText (text) {
        setLocalQuery(text);
    }

    const filterShortMovies = (arrayMovies) => {
        let results = arrayMovies.filter(movie => movie.duration <= 40);
        return results;
}

    const searchMovies = (arrMovies, localQuery, isToggleActive) => {
        let results = arrMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(localQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(localQuery.toLowerCase())
        )
        setFiltredSavedMovies(results);

        if (isToggleActive) {
            results = filterShortMovies(results);
            setFiltredSavedMovies(results);
        }        
    }

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive)
    }


    return (
        <>
            <Header/>
                <main className="movies">
                    <SearchForm
                        handleSearchButton={transferSerchText}
                        isToggleActive={isToggleActive}
                        handleToggle={handleToggle}
                        

                    />
                    {/* <Preloader/> */}
                    <MoviesCardList
                        handleLike={handleLike}
                        savedMovies={filtredSavedtMovies}
                        searchError={searchError}
                        

                    />
                    <button type="button" className="movies__button">Ещё</button>
                </main>
            <Footer/>
        </>
    )
}