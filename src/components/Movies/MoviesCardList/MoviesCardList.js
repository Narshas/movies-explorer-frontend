import React from "react";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export function MoviesCardList({ filtredShortMovies, searchError, savedMovies, shownCards, foundMovies }) {

    const [toRender, setToRender] = useState([]);
    const location = useLocation();

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
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}