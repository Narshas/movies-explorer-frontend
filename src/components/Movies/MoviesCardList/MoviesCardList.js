import React from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList() {
    return (
        <section className="movies-cardlist">
            <ul className="movies-cardlist__container">
                <li>
                    <MoviesCard/>
                </li>
                <li>
                    <MoviesCard/>
                </li>
                <li>
                    <MoviesCard/>
                </li>
                <li>
                    <MoviesCard/>
                </li>
                <li>
                    <MoviesCard/>
                </li>
            </ul>
        </section>
    );
}