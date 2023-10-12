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
    
    

    useEffect(() => {
        if (location.pathname === "/saved-movies") {
            setToRender(savedMovies.slice(0, shownCards));
        } else if (location.pathname === "/movies") {
            if (shownMovies.length) {
                setToRender(shownMovies.slice(0, shownCards));
            } else if (foundMovies.length) {
                setToRender(foundMovies.slice(0, shownCards));
            }
        }

    }, [shownCards, shownMovies, savedMovies, foundMovies, location.pathname])

    useEffect(() => {
        console.log("MoviesCardList useEffect triggered. Current toRender:", toRender);
    }, [toRender]);

    // const validMovies = toRender.filter(movie => movie !== undefined);

    return (
        <section className="movies-cardlist">
            {searchError ? (
                <div className="movies-cardlist_error">{searchError}</div>
            ) : (
                <>
                    <ul className="movies-cardlist__container">
                        {toRender.map(movieCard => {
                            return (
                                // <li key={location.pathname === "/movies" ? movie.id : movie._id}>
                                <li key={location.pathname === "/movies" ? movieCard.id : movieCard._id}>
                                    {console.log(location.pathname === "/movies" ? movieCard.id : movieCard.movieId)} 
                                    <MoviesCard 
                                        movieCard={movieCard}
                                        savedMovies={savedMovies}
                                        handleLike={handleLike}
                                        
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </section>
    );
}