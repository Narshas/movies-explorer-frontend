import React from "react";
import "./PageNotFound.css";
import { Link } from 'react-router-dom';

export function PageNotFound() {
    return (
        <section className="pageNotFound">
            <h2 className="pageNotFound__title">404</h2>
            <p className="pageNotFound__text">Страница не найдена</p>
            <Link to="/" className="pageNotFound__link">Назад</Link>
        </section>
    );
}
