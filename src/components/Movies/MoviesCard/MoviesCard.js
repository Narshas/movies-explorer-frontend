import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

export function MoviesCard({ movie, savedMovies, handleLike}) {
    const location = useLocation();
    console.log(`Rendering movie card: ${movie.name}`);

    let isSaved = savedMovies.some((i) => i.movieID === movie.id);

    const handleLikeButton = () => {
        handleLike(movie)
            .then(() => {
                isSaved = !isSaved;
            })
            .catch(err => console.log(err));
        
    }

    let coverSrc = location.pathname === "/movies" 
    ? `https://api.nomoreparties.co${movie.image.url}` 
    : movie.image;

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__cover" src={coverSrc} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">{movie.nameRU}</h2>
                <button type="button" className={`movies-card__button ${isSaved ? "movies-card__button_active" : ""}`} onClick={handleLikeButton}></button>
            </div>
            <p className="movies-card__duration">{Math.floor(movie.duration / 60) + 'ч' + (movie.duration % 60) + 'м'}</p>
        </div>
    );
}