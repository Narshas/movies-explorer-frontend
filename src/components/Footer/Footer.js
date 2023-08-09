import React from "react";
import "./Footer.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            </div>
            <div className="footer__signature">
                <p className="footer__copyright">&copy; 2023</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <p>Яндекс.Практикум</p>
                    </li>
                    <li className="footer__item">
                        <p>GitHub</p>
                    </li>
                </ul>
            </div>
        </footer>
    )
}