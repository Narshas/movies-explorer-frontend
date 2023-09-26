import React from "react";
import { useEffect } from "react";
import "./MoviesCardList.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList({ foundMovies, shownCards, isSavedMovies }) {

    const [toRender, setToRender] = useState([]);

    useEffect(() => {
        if (!isSavedMovies) {
            setToRender(foundMovies.slice(0, shownCards));
        } else {
            setToRender()
        }
        
    }, [foundMovies])

    const renderConent = ? : (foundMovies.)

    return (
        <section className="movies-cardlist">
            <ul className="movies-cardlist__container">
                {toRender.map(movie => (
                    <li>
                        <MoviesCard 
                            movie={movie}
                            key={}
                            isSavedMovies={}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}