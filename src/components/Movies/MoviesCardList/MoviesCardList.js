import React from "react";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export function MoviesCardList({ 
    shownMovies, 
    searchError, 
    savedMovies, 
    foundMovies, 
    handleLike,
    shownCards
}) {

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
    }, [shownCards, savedMovies])

    useEffect(() => {
        if (location.pathname === "/movies") {
            if (shownMovies.length) {
                setToRender(shownMovies.slice(0, shownCards));
            } else if (foundMovies.length) {
                setToRender(foundMovies.slice(0, shownCards));
            }
        }
    }, [shownMovies, foundMovies, shownCards])

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