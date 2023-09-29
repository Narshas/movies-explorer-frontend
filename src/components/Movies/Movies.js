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

export function Movies({loggedIn, savedMovies}) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);

    const [searchError, setSearchError] = useState('');
    const [filtredShortMovies, setFiltredShortMovies] = useState([]);

    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || '');
    const [shownCards, setShownCards] = useState(presetCards());

    const filterShortMovies = (arrayMovies) => {
            let results = arrayMovies.filter(movie => movie.duration <= 40);
            return results;
    }
    
    const searchMovies = (arrMovies, searchQuery, isToggleActive) => {
        let results = allMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFoundMovies(results);
        localStorage.setItem('found movies', JSON.stringify(results));

        if (isToggleActive) {
            results = filterShortMovies(results);
            setFiltredShortMovies(results);
            localStorage.setItem('filtredShortMovies', JSON.stringify(results));
        }        
    }
    
    const handleSearchButton = (searchQuery) => {
        setIsLoading(true)
        if (!allMovies) {
            getAllMovies()
                .then(res => {
                    setAllMovies(res);
                    searchMovies(res, searchQuery, isToggleActive);
                })
                .catch(err => {
                    console.log(err);
                    setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
        } else {
            searchMovies(allMovies, searchQuery, isToggleActive)
        }
        setIsLoading(false)
    }

    useEffect (() => {
        localStorage.setItem('isToggleActive', isToggleActive);
    }, [isToggleActive])

    useEffect(() => {
        if (localStorage.setItem('isToggleActive')) {
            setIsToggleActive(true)
        }
    }, [])

    useEffect (() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery])



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

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery)
    }, [searchQuery]);

    useEffect(() => {
        if (localStorage.getItem('searchQuer') && !filtredShortMovies.length) {
            setSearchError('Ничего не найдено');
        } else {
            setSearchError('');
        }
    }, []);

    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm
                    handleSearchButton={handleSearchButton}
                    filterShortMovies={filterShortMovies}
                    isToggleActive={isToggleActive}
                    setIsToggleActive={setIsToggleActive}

                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}                    
                    
                    allMovies={allMovies}
                    foundMovies={foundMovies}

                    
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
                        filtredShortMovies={filtredShortMovies}
                        searchError={searchError}
                        savedMovies={savedMovies}
                        foundMovies={foundMovies}

                        shownCards={shownCards}
                        isSavedMovies={isSavedMovies}
                    />
                )}
                {foundMovies.length > shownCards (
                    <button type="button" className="movies__button" onClick={handleMoreButton}>
                        Ещё
                    </button>
                )}
            </main>
            <Footer/>
        </>
    );
}