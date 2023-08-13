import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/arrow-icon.svg"

export function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link">Статичный сайт
                            <img src={arrow} className="porfolio__icon" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link">Адаптивный сайт
                            <img src={arrow} className="porfolio__icon" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link">Одностраничное приложение
                            <img src={arrow} className="porfolio__icon" />
                    </a>
                </li>
            </ul>
        </section>
    );
}