import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MoviesCard.css";

export function MoviesCard({ movieCard, savedMovies, handleLike, handleDeleteMovie}) {
    const location = useLocation();
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(location.pathname === "/movies" ? savedMovies.some((i) => i.movieId === movieCard.id) : true);
    }, [savedMovies, location.pathname, movieCard.id]);

    const handleButtonClick = () => {
        console.log('isSaved before change', isSaved);
        if (location.pathname === "/saved-movies") {
            handleDeleteMovie(movieCard)
        } else {
            handleLike(movieCard)
                .then(() => {
                    setIsSaved(!isSaved);
                    // isSaved = !isSaved;
                })
                .catch(err => console.log(err));
        }
    };

    let coverSrc = location.pathname === "/movies" 
    ? `https://api.nomoreparties.co${movieCard.image.url}` 
    : movieCard.image;

    let buttonCss = location.pathname === "/movies"
    ? `movies-card__button ${isSaved ? "movies-card__button_active" : ""}`
    : "movies-card__button movies-card__button_unsave";

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__cover" src={coverSrc} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">{movieCard.nameRU}</h2>
                <button type="button" 
                    className={buttonCss} 
                    onClick={handleButtonClick}
                >
                </button>
            </div>
            <p className="movies-card__duration">{Math.floor(movieCard.duration / 60) + 'ч' + (movieCard.duration % 60) + 'м'}</p>
        </div>
    );
}