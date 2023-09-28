import React from "react";
import "./SavedMovies.css";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
import { Preloader } from "../Movies/Preloader/Preloader";

export function SavedMovies({savedMovie}) {
    const [foundMovies, setFoundMovies] = useState([]);

    const searchMovies= () => {
        
    }


    return (
        <>
            <Header/>
                <main className="movies">
                    <SearchForm/>
                    {/* <Preloader/> */}
                    <MoviesCardList

                    />
                    <button type="button" className="movies__button">Ещё</button>
                </main>
            <Footer/>
        </>
    )
}