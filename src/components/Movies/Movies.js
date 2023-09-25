import React from "react";
import { useState } from "react";
import "./Movies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Preloader } from "./Preloader/Preloader";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import { CurrentUserContext } from "../App/App";
import { getMovies } from "../../utils/MoviesApi";

export function Movies(props) {
    const { handleSearch, searchQuery } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [isToggleActive, setIsToggleActive] = useState(false);
    const [isMoreFilms setIsMoreFilms] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [allMovies, setAllMovies] = useState([]);


    useEffect (() => {
        getMovies()
            .then(res => {
                setAllMovies(res)
                setFoundMovies(res)
            })
            .catch(err => console.log(err))
    }, [])

    const searchMovies = (query) => {
        setIsLoading(true)
        if (!query.lenght) {

        } else {
            const results = films.filter(movie => 
                movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(query.toLowerCase())
            )
            if (isToggleActive){
                results = results.filter(movie => movie.duration <= 40)
            }
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
                    isToggleActive={isToggleActive}
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