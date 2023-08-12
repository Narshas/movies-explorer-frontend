import React from "react";
import "./Portfolio.css";

export function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link">Статичный сайт
                            <div className="porfolio__icon"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link">Адаптивный сайт
                            <div className="porfolio__icon"></div>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link">Одностраничное приложение
                            <div className="porfolio__icon"></div>
                    </a>
                </li>
            </ul>
        </section>
    );
}