import React from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList() {
    return (
        <section className="movies-cardlist">
            <div className="movies-cardlist__container">
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
                <MoviesCard/>
            </div>
        </section>
    );
}