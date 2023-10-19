import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
// import { Preloader } from "../Movies/Preloader/Preloader";

export function SavedMovies({savedMovies, handleLike, handleDeleteMovie}) {
    // eslint-disable-next-line
    const [searchError, setSearchError] = useState('');
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [filtredSavedMovies, setFiltredSavedMovies] = useState(savedMovies);
    const [localQuery, setLocalQuery] = useState('');

    console.log('savedMovies после обновления — в savedMovies', savedMovies);

    useEffect(() => {
        setFiltredSavedMovies(savedMovies);
        // setFiltredSavedMovies(searchSavedMovies(localQuery, isToggleActive));
        searchSavedMovies(localQuery, isToggleActive);
    }, [savedMovies]);

    const searchSavedMovies = (localQuery, isToggleActive) => {
        let results = savedMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(localQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(localQuery.toLowerCase())
        )
        if (isToggleActive) {
            const filteredResults = filterShortMovies(results);
            setFiltredSavedMovies(filteredResults);
        } else {
            setFiltredSavedMovies(results);
        }
    }

    const handleToggle = () => {
        setIsToggleActive(prev => !prev);
        searchSavedMovies(localQuery, !isToggleActive);
    }

    // const handleToggle = () => {
    //     if (isToggleActive) {
    //         setFiltredSavedMovies(savedMovies);
    //     } else {
    //         setFiltredSavedMovies(filterShortMovies(savedMovies));
    //     }
    //     setIsToggleActive(!isToggleActive);

    // }

    const filterShortMovies = (arrayMovies) => {
        let results = arrayMovies.filter(movie => movie.duration <= 40);
        return results;
    }

    const handleSearchButton = (text, isToggleActive) => {
        setLocalQuery(text);
        searchSavedMovies (text, isToggleActive);
    }

    return (
        <>
            <Header/>
                <main className="movies">
                    <SearchForm
                        handleSearchButton={handleSearchButton}
                        isToggleActive={isToggleActive}
                        handleToggle={handleToggle}
                        setSearchQuery={setLocalQuery}
                        searchQuery={localQuery}
                        setSearchError={setSearchError}                       
                    />
                    <MoviesCardList
                        handleLike={handleLike}
                        savedMovies={filtredSavedMovies}
                        searchError={searchError}
                        isToggleActive={isToggleActive}
                        handleDeleteMovie={handleDeleteMovie}
                    />
                </main>
            <Footer/>
        </>
    )
}