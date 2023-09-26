import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Preloader } from "./Preloader/Preloader";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import { CurrentUserContext } from "../App/App";
import { getMovies } from "../../utils/MoviesApi";

export function Movies({ }) {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isMoreFilms, setIsMoreFilms] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || '');
    const [shownCards, setShownCards] = useState(presetCards());
    const [isSavedMovies, setIsSaveMovies] = useState(false);

    useEffect (() => {
        localStorage.setItem('isToggleActive', isToggleActive);
    }, [isToggleActive])

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

    function handleMoreButton = () => {
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
        handleResize() {
            setShownCards(presetCards());
        }
        window.addEventListener('resize', handleResize);
        return () => { window.removeEventListener("resize", handleResize) };
    }, [])    

    useEffect(() => {
        localStorage.setItem("searchQuery", searchQuery)
    }, [searchQuery]);

    const getAllMovies = () => {
        getMovies()
            .then(res => {
                setAllMovies(res)
                console.log("Загруженные фильмы:", res);
            })
            .catch(err => console.log(err))
    }



    const searchMovies = (searchQuery, isToggleActive) => {
        setIsLoading(true)
        if (!allMovies) {
            getAllMovies();
        } else {
            let results = allMovies.filter(movie => 
                movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
            )
            if (isToggleActive) {
                filterShortMovies(results)
            }
            setFoundMovies(results);
            localStorage.setItem("searchResults", JSON.stringify(results))
        }
        setIsLoading(false)
    }

    const filterShortMovies = (arrayMovies) => {
        return results = arrayMovies.filter(movie => movie.duration <= 40)
    }


    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm
                    searchMovies={searchMovies}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    
                    isToggleActive={isToggleActive}
                    setIsToggleActive={setIsToggleActive}
                    
                    allMovies={allMovies}
                    foundMovies={foundMovies}

                    filterShortMovies={filterShortMovies}
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
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