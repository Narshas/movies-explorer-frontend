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
    const [hasSearched, setHasSearched] = useState(false);
    const [shownMovies, setShownMovies] = useState([]);

    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || '');
    const [shownCards, setShownCards] = useState(presetCards());

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
        if (isToggleActive) {
            setShownMovies(foundMovies);
        } else {
            setShownMovies(filterShortMovies(foundMovies));
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
        setFoundMovies(results);
        localStorage.setItem('found movies', JSON.stringify(results));

        if (isToggleActive) {
            const filteredResults = filterShortMovies(results);
            setShownMovies(filteredResults);
            localStorage.setItem('filtredShortMovies', JSON.stringify(filteredResults));
        } else {
            setShownMovies(results);
        }
    }
    
    const handleSearchButton = (searchQuery, currentMovies, currentToggleState) => {
        setIsLoading(true)
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
        setIsLoading(false);
        setHasSearched(true);
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
        if (searchQuery && hasSearched) {
            if (shownMovies.length || foundMovies.length) {
                setSearchError('');
            } else {
                setSearchError('Ничего не найдено');
            }
        }
        
    }, [shownMovies, searchQuery, foundMovies]);

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
                        shownMovies={shownMovies}
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