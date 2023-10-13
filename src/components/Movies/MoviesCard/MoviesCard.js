import React from "react";
import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./MoviesCard.css";

export function MoviesCard({ movieCard, savedMovies, handleLike, handleDeleteMovie}) {
    const location = useLocation();
    // const [isSaved, setIsSaved] = useState(false);

    // const isSaved = savedMovies.some((i) => i.movieID === movieCard.movieID);
    let isSaved = location.pathname === "/movies"
    ? savedMovies.some((i) => i.movieID === movieCard.id)
    : true;

    // useEffect(() => {
    //     setIsSaved(savedMovies.some((i) => i.movieID === movieCard.movieID));
    // }, [savedMovies]);

    const handleButtonClick = () => {
        if (location.pathname === "/saved-movies") {
            handleDeleteMovie(movieCard);
        } else {
            handleLike(movieCard)
                .then(() => {
                    // setIsSaved(!isSaved);
                    isSaved = !isSaved;
                    console.log('isSaved changed, now it is:', isSaved);
                })
                .catch(err => console.log(err));
        }
    };

    let coverSrc = location.pathname === "/movies" 
    ? `https://api.nomoreparties.co${movieCard.image.url}` 
    : movieCard.image;

    let buttonCSS = `movies-card__button ${isSaved ? "movies-card__button_active" : ""}`;

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__cover" src={coverSrc} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">{movieCard.nameRU}</h2>
                <button type="button" 
                    className={buttonCSS} 
                    onClick={handleButtonClick}
                >
                </button>
            </div>
            <p className="movies-card__duration">{Math.floor(movieCard.duration / 60) + 'ч' + (movieCard.duration % 60) + 'м'}</p>
        </div>
    );
}