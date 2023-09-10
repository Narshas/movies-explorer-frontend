import React from "react";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            
                <div className="footer__signature">
                    <p className="footer__copyright">&copy; 2023</p>
                    <ul className="footer__list">
                        <li className="footer__item">
                            <a className="footer__link" href="https://practicum.yandex.ru" target="_blank">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__item">
                            <a className="footer__link" href="https://github.com/Narshas" target="_blank">GitHub</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}