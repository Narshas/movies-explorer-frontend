import React from "react";
import "./MoviesCard.css";
import testCover from "../../../images/test-cover.png";
import { useState } from "react";

export function MoviesCard() {
    const [isSaved, setIsSaved] = useState(false);

    const handleLike = () => {
        setIsSaved(!isSaved);
    }

    return (
        <div className="movies-card">
            <a className="movies-card__link" href="https://media.giphy.com/media/l0MYw1yaEBNH2UhoI/giphy.gif" target="_blank">
                <img className="movies-card__cover" src={testCover} alt="Обложка фильма"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name">Gimme Danger: История Игги и The Stooges</h2>
                <button type="button" className={`movies-card__button ${isSaved ? "movies-card__button_active" : ""}`} onClick={handleLike}></button>
            </div>
            <p className="movies-card__duration">1ч42м</p>
        </div>

    );
}