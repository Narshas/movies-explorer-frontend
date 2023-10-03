import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
// import { Preloader } from "../Movies/Preloader/Preloader";

export function SavedMovies({savedMovies, loggedIn, handleLike}) {
    const [searchError, setSearchError] = useState('');
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [filtredSavedtMovies, setFiltredSavedMovies] = useState([]);
    const [localQuery, setLocalQuery] = useState('');

    useEffect(() => {
        let results = savedMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(localQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(localQuery.toLowerCase())
        )

        if (isToggleActive) {
            results = filterShortMovies(results);
        }
        
        setFiltredSavedMovies(results)

    }, [savedMovies, localQuery, isToggleActive]);

    const filterShortMovies = (arrayMovies) => {
        let results = arrayMovies.filter(movie => movie.duration <= 40);
        return results;
    }

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive)
    }

    const transferSearchText = (text) => {
        setLocalQuery(text);
    };


    return (
        <>
            <Header/>
                <main className="movies">
                    <SearchForm
                        handleSearchButton={transferSearchText}
                        isToggleActive={isToggleActive}
                        handleToggle={handleToggle}
                        

                    />
                    {/* <Preloader/> */}
                    <MoviesCardList
                        handleLike={handleLike}
                        savedMovies={filtredSavedtMovies}
                        searchError={searchError}
                        isToggleActive={isToggleActive}
                        

                    />
                </main>
            <Footer/>
        </>
    )
}