import React from "react";
import "./AboutMe.css";
import { Portfolio } from "../Portfolio/Portfolio";
import profilePhoto from "../../../images/profile-photo.png";


export function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <h3 className="about-me__name">Марк</h3>
                <p className="about-me__subtitle">Фронтенд-разработчик, 32 года</p>
                <p className="about-me__about">Абзац про меня</p>
                <a className="about-me__link">GitHub</a>
            </div>
            <img className="about-me__photo" src={profilePhoto}></img>
            <Portfolio/>
        </section>
    )
}