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
    const [isToggleActive, setIsToggleActive] = useState(localStorage.getItem("isToggleActive") === 'true');
    const [allMovies, setAllMovies] = useState([]);

    const [searchError, setSearchError] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [shownMovies, setShownMovies] = useState([]);

    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || '');
    const [shownCards, setShownCards] = useState(presetCards());

    //======search-zone========= 
    
    const searchMovies = (arrMovies, searchQuery, isToggleActive) => {
        let results = arrMovies.filter(movie => 
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFoundMovies(results);
        localStorage.setItem('foundMovies', JSON.stringify(results));

        if (isToggleActive) {
            const filteredResults = filterShortMovies(results);
            setShownMovies(filteredResults);
            //localStorage.setItem('filtredShortMovies', JSON.stringify(filteredResults));
        } else {
            setShownMovies(results);
        }
        if (shownMovies.length) {
            setSearchError('');
        } else {
            setSearchError('Ничего не найдено');
        }
    }

    const filterShortMovies = (arrayMovies) => {
        let results = arrayMovies.filter(movie => movie.duration <= 40);
        return results;
    }

    const handleToggle = () => {
        setIsToggleActive(prev => !prev);
        if (!isToggleActive) {
            setShownMovies(filterShortMovies(foundMovies));
        } else {
            setShownMovies(foundMovies);
        }
    };

    // const handleToggle = () => {
    //     console.log('toggle touched');
    //     if (isToggleActive) {
    //         setShownMovies(foundMovies);
    //     } else {
    //         setShownMovies(filterShortMovies(foundMovies));
    //     }
    //     setIsToggleActive(!isToggleActive);
    //     //нужен, чтобы тогл работал и после поиска
    //     //========проверить, не перевернуть ли isToggleActive
        
    // }

    const handleSearchButton = (searchQuery, currentMovies, currentToggleState) => {
        setIsLoading(true)
        console.log('now IsLoading(true)')
        if (!currentMovies.length) {
            getAllMovies()
                .then(res => {
                    setAllMovies(res);
                    searchMovies(res, searchQuery, currentToggleState);
                })
                .catch(err => {
                    console.log(err);
                    setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setSearchError('');
            searchMovies(currentMovies, searchQuery, currentToggleState);
        }
        setHasSearched(true);
    }    

    useEffect (() => {
        console.log('toggle added to storage like', isToggleActive);
        localStorage.setItem('isToggleActive', isToggleActive);
    }, [isToggleActive])

    useEffect (() => {
        localStorage.setItem('searchQuery', searchQuery);
    }, [searchQuery])

    useEffect(() => {
        if (searchQuery && hasSearched) {
            if (shownMovies.length) {
                setSearchError('');
            } else {
                setSearchError('Ничего не найдено');
            }
        }
    }, [shownMovies, searchQuery]);

    useEffect(() => {
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    }, [foundMovies]);

    useEffect(() => {
        const currentToggleValue = localStorage.getItem('isToggleActive') === 'true';
        const currenQueryValue = localStorage.getItem('searchQuery');

        setIsToggleActive(currentToggleValue);
        setSearchQuery(currenQueryValue || '');

        if (currenQueryValue) {
            handleSearchButton(currenQueryValue, allMovies, currentToggleValue);
        }

        // const currentToggleValue = localStorage.getItem('isToggleActive');
        // console.log('currentToggleValue now is', currentToggleValue);
        // if (currentToggleValue === 'true') {
        //     setIsToggleActive(true)
        // } else {
        //     setIsToggleActive(false)
        // }

        // const foundMovies = JSON.parse(localStorage.getItem('foundMovies'));
        // if (foundMovies && foundMovies.length) {
        //     if (isToggleActive) {
        //         setShownMovies(filterShortMovies(foundMovies));
        //     } else {
        //         setShownMovies(foundMovies);
        //     }
        // }
    }, []);

    // ==========resize-zone===============
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
                    setSearchError={setSearchError}

                    
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
                        handleLike={handleLike}
                        savedMovies={savedMovies}
                        searchError={searchError}
                        shownCards={shownCards}
                        shownMovies={shownMovies}
                        // foundMovies={foundMovies}
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