import React from "react";
import "./PageNotFound.css";
import { useNavigate } from 'react-router-dom';

export function PageNotFound() {
    const navigate = useNavigate();

    const turnBack = () => {
        navigate(-1);
    }

    return (
        <main>
            <section className="pageNotFound">
                <h2 className="pageNotFound__title">404</h2>
                <p className="pageNotFound__text">Страница не найдена</p>
                <button onClick={turnBack} className="pageNotFound__link">Назад</button>
                {/* <Link to="/" className="pageNotFound__link">Назад</Link> */}
            </section>
        </main>
    );
}
