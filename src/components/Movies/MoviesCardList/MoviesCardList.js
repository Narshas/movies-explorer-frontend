import React from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList() {
    return (
        <section className="movie-cardlist">
            <div className="movie-cardlist__container">
                <MoviesCard/>
            </div>
        </section>
    );
}