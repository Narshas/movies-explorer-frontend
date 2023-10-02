import React from "react";
import "./MoviesCard.css";
import { useState, useEffect } from "react";

export function MoviesCard({ movie, savedMovies, handleLike}) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (savedMovies.some((i) => i.movieID === movie.id)) {
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    }, [movie, savedMovies])

    const handleLikeButton = () => {
        handleLike(movie);
        setIsSaved(!isSaved);
    }

    let coverSrc = `https://api.nomoreparties.co${movie.image.url}`

    return (
        <div className="movies-card">
            <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__cover" src={coverSrc} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">{movie.name}</h2>
                <button type="button" className={`movies-card__button ${isSaved ? "movies-card__button_active" : ""}`} onClick={handleLikeButton}></button>
            </div>
            <p className="movies-card__duration">{Math.floor(movie.duration / 60) + 'ч' + (movie.duration % 60) + 'м'}</p>
        </div>

    );
}