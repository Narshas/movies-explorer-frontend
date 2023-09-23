import React from "react";
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

    useEffect (() => {
        
    })

    const serchMovie = () => {
        setIsLoading(true)
            if (text.lenght) {

            } else {

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
                />
                {isLoading && <Preloader/>}
                {!isLoading && (
                    <MoviesCardList
                    
                    />
                )}
                <button type="button" className="movies__button">Eщё</button>
            </main>
            <Footer/>
        </>
    );
}