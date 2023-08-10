import React from "react";
import "./MoviesCard.css";

export function MoviesCard() {
    return (
        <div className="movies-card">
            <a className="movies-card__link">
                <img className="movies-card__cover"/>    
            </a>
            <div className="movies-card__about">
                <h2 className="movies-card__name"></h2>
                <button className="movies-card__delete-button">
                    <img className="movies-card__delete-icon"/>
                </button>
                <button className="movies-card__save-button">
                    <img className="movies-card__save-icon"/>
                </button>
                <p className="movies-card__duration"></p>
            </div>
        </div>

    );
}