import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

export function MoviesCard({ movieCard, savedMovies, handleLike}) {
    const location = useLocation();

    console.log("Checking movieCard.id:", movieCard._id);
    let isSaved = savedMovies.some((i) => i.movieID === movieCard.movieID);

    const handleLikeButton = () => {
        console.log("handleLikeButton clicked for movie:", movieCard);
        handleLike(movieCard)
            .then(() => {
                isSaved = !isSaved;
            })
            .catch(err => console.log(err));
        
    }

    let coverSrc = location.pathname === "/movies" 
    ? `https://api.nomoreparties.co${movieCard.image.url}` 
    : movieCard.image;

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={movieCard.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__cover" src={coverSrc} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">{movieCard.nameRU}</h2>
                <button type="button" className={`movies-card__button ${isSaved ? "movies-card__button_active" : ""}`} onClick={handleLikeButton}></button>
            </div>
            <p className="movies-card__duration">{Math.floor(movieCard.duration / 60) + 'ч' + (movieCard.duration % 60) + 'м'}</p>
        </div>
    );
}