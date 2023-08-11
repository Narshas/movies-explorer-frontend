import React from "react";
import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../Footer/Footer";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
import { Preloader } from "../Movies/Preloader/Preloader";

export function SavedMovies() {
    return (
        <>
            <Header/>
                <main className="movies">
                    <SearchForm/>
                    <Preloader/>
                    <MoviesCardList/>
                    <button className="movies__button">Ещё</button>
                </main>
            <Footer/>
        </>
    )
}