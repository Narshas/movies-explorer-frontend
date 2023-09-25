import React from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList({ foundMovies }) {
    return (
        <section className="movies-cardlist">
            <ul className="movies-cardlist__container">
                {foundMovies.map(movie => (
                    <li>
                        <MoviesCard film={film}/>
                    </li>
                ))}
            </ul>
        </section>
    );
}