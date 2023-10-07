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
    handleLike,
    shownCards
}) {

    const [toRender, setToRender] = useState([]);
    console.log("Movies component is rendering");
    console.log("Current toRender:", toRender);
    const location = useLocation();

    console.log("MCL rendered");
    console.log("MCL props foundMovies:", foundMovies);
    console.log("MCL props filtredShortMovies:", filtredShortMovies);
    console.log("MCL props savedMovies:", savedMovies);

    // useEffect(() => {
    //     if (!isSavedMovies) {
    //         setToRender(foundMovies.slice(0, shownCards));
    //     } else {
    //         setToRender()
    //     }
        
    // }, [foundMovies])

    useEffect(() => {
        console.log('movie objects in toRender have changed');
    }, [toRender]);
    
    useEffect(() => {
        console.log('savedMovies has changed');
    }, [savedMovies]);
    
    useEffect(() => {
        console.log('handleLike function has changed');
    }, [handleLike]);
    

    useEffect(() => {
        if (location.pathname === "/saved-movies") {
            console.log("Rendering saved movies...");
            setToRender(savedMovies.slice(0, shownCards));
        }
    }, [shownCards, savedMovies])

    useEffect(() => {
        if (location.pathname === "/movies") {
            if (filtredShortMovies.length) {
                console.log("Rendering filtered short movies...");
                setToRender(filtredShortMovies.slice(0, shownCards));
            } else if (foundMovies.length) {
                console.log("Rendering found movies...");
                setToRender(foundMovies.slice(0, shownCards));
                console.log("Updated toRender:", toRender);
            }
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