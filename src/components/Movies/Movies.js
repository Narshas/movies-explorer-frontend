import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Preloader } from "./Preloader/Preloader";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
//import { CurrentUserContext } from "../App/App";
import { getAllMovies } from "../../utils/MoviesApi";

export function Movies({savedMovies, handleLike }) {
    console.log("Movies is rendering");
    const [isLoading, setIsLoading] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);

    const [searchError, setSearchError] = useState('');
    const [filtredShortMovies, setFiltredShortMovies] = useState([]);

    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || '');
    const [shownCards, setShownCards] = useState(presetCards());

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        if (foundMovies) {
            setFiltredShortMovies(filterShortMovies(foundMovies));
        } else {
            setFiltredShortMovies(filterShortMovies(allMovies));
        }
    }

    const filterShortMovies = (arrayMovies) => {
            let results = arrayMovies.filter(movie => movie.duration <= 40);
            return results;
    }
    
    const searchMovies = (arrMovies, searchQuery, isToggleActive) => {
        let results = arrMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        )
        console.log("filtered results:", results);
        setFoundMovies(results);
        localStorage.setItem('found movies', JSON.stringify(results));

        if (isToggleActive) {
            results = filterShortMovies(results);
            setFiltredShortMovies(results);
            localStorage.setItem('filtredShortMovies', JSON.stringify(results));
        }        
    }
    
    const handleSearchButton = (searchQuery, currentMovies, currentToggleState) => {
        setIsLoading(true)
        console.log("allMovies stat:", allMovies);
        if (!currentMovies.length) {
            console.log('begore fetch allMovies');
            getAllMovies()
                .then(res => {
                    console.log('movies fetched:', res);
                    setAllMovies(res);
                    searchMovies(res, searchQuery, currentToggleState);
                })
                .catch(err => {
                    console.log(err);
                    setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
        } else {
            searchMovies(currentMovies, searchQuery, currentToggleState);
        }
        setIsLoading(false)
    }

    useEffect (() => {
        localStorage.setItem('isToggleActive', isToggleActive);
    }, [isToggleActive])

    useEffect(() => {
        const currentToggleValue = localStorage.getItem('isToggleActive');
        if (currentToggleValue === 'true') {
            setIsToggleActive(true)
        } else {
            setIsToggleActive(false)
        }
    }, [])

    useEffect (() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery])

    useEffect(() => {
        if (!filtredShortMovies.length && searchQuery) {
            setSearchError('Ничего не найдено');
        } else {
            setSearchError('');
        }
    }, [filtredShortMovies, searchQuery]);

    function presetCards() {
        const windowSize = window.innerWidth;
        if (windowSize >= 1280) {
            return 16;
        } else if (windowSize >= 1001) {
            return 12;
        } else if ( windowSize >= 768 ) {
            return 8;
        } else {
            return 5;
        }
    }

    function handleMoreButton() {
        const windowSize = window.innerWidth;
        if (windowSize >= 1280) {
            setShownCards(shownCards + 4);
        } else if (windowSize >= 1001) {
            setShownCards(shownCards + 3);
        } else if ( windowSize >= 768 ) {
            setShownCards(shownCards + 2);
        } else {
            setShownCards(shownCards + 1);
        }
    }

    useEffect(() => {
        function handleResize() {
            setShownCards(presetCards());
        }
        window.addEventListener('resize', handleResize);
        return () => { 
            window.removeEventListener("resize", handleResize) 
        };
    }, []);

    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm
                    handleSearchButton={handleSearchButton}
                    filterShortMovies={filterShortMovies}
                    isToggleActive={isToggleActive}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}                    
                    allMovies={allMovies}
                    handleToggle={handleToggle}

                    
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
                        handleLike={handleLike}
                        savedMovies={savedMovies}
                        searchError={searchError}
                        shownCards={shownCards}
                        filtredShortMovies={filtredShortMovies}
                        foundMovies={foundMovies}
                    />
                )}
                {foundMovies.length > shownCards ? (
                    <button type="button" className="movies__button" onClick={handleMoreButton}>
                        Ещё
                    </button>
                ) : null}
            </main>
            <Footer/>
        </>
    );
}