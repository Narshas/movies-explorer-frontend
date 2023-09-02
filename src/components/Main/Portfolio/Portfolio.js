import React from "react";
import "./Portfolio.css";
import arrow from "../../../images/arrow-icon.svg"

export function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/Narshas/how-to-learn">Статичный сайт
                        <img src={arrow} className="portfolio__icon" alt="иконка со стрелочкой"/>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/Narshas/russian-travel">Адаптивный сайт
                        <img src={arrow} className="portfolio__icon" alt="иконка со стрелочкой" />
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/Narshas/react-mesto-api-full-gha">Одностраничное приложение
                        <img src={arrow} className="portfolio__icon" alt="иконка со стрелочкой"/>
                    </a>
                </li>
            </ul>
        </section>
    );
}