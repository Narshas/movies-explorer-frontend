import React from "react";
import "./Movies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Preloader } from "./Preloader/Preloader";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm";

export function Movies() {
    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm>
                    <Preloader/>
                    <MoviesCardList/>
                </SearchForm>
                <button className="movies__button">Eщё</button>
            </main>
            <Footer/>
        </>
    );
}