import React from "react";
import { useState } from "react";
import "./Movies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Preloader } from "./Preloader/Preloader";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import { CurrentUserContext } from "../App/App";

export function Movies(props) {
    const { handleSearch, searchQuery } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isMoreFilms setIsMoreFilms] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);

    useEffect (() => {

    })

    const searchMovies = (query) => {
        setIsLoading(true)
        if (!text.lenght) {

        } else {
            const results = films.filter(film => 
                film.nameRU.toLowerCase().includes(query.toLowerCase()) ||
                film.nameEN.toLowerCase().includes(query.toLowerCase())
            )
            setFoundMovies(results);
        }

        setIsLoading(false)
    }

    const handleToggle = () => {
        setIsToggleActive(!isToggleActive);
    }



    return (
        <>
            <Header/>
            <main className="movies">
                <SearchForm
                    handleSearch={handleSearch}
                    searchQuery={searchQuery}
                    handleToggle={handleToggle}
                    searchMovies={searchMovies}
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
                        cards={foundMovies}
                    />
                )}
                <button type="button" className="movies__button">Eщё</button>
            </main>
            <Footer/>
        </>
    );
}