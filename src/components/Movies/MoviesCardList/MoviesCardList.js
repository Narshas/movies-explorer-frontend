import React from "react";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export function MoviesCardList({ 
    filtredShortMovies, 
    searchError, 
    savedMovies, 
    foundMovies, 
    handleLike
}) {

    const [toRender, setToRender] = useState([]);
    const location = useLocation();
    const [shownCards, setShownCards] = useState(presetCards());

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

    // useEffect(() => {
    //     if (!isSavedMovies) {
    //         setToRender(foundMovies.slice(0, shownCards));
    //     } else {
    //         setToRender()
    //     }
        
    // }, [foundMovies])

    useEffect(() => {
        if (location.pathname === "/saved-movies") {
            setToRender(savedMovies.slice(0, shownCards));
        }

        if (location.pathname === "/movies" && filtredShortMovies) {
            setToRender(filtredShortMovies.slice(0, shownCards));
        } else if (location.pathname === "/movies" && foundMovies) {
            setToRender(foundMovies.slice(0, shownCards));
        }
    }, [filtredShortMovies, foundMovies, shownCards])

    return (
        <section className="movies-cardlist">
            {searchError && (
                <div>{searchError}</div>
            )}
            <ul className="movies-cardlist__container">
                {toRender.map(movie => {
                    return (
                        <li key={movie.id}>
                            <MoviesCard 
                                movie={movie}
                                savedMovies={savedMovies}
                                handleLike={handleLike}
                                
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}