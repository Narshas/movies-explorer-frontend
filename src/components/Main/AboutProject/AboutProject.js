import React from "react";
import "./AboutProject.css";

export function AboutProject() {
    return (
        <section id="aboutProject" className="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__container">
                <ul className="about-project__list">
                    <li className="about-project__point">
                        <h3 className="about-project__point-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__point-text">Составление плана, работу над бэкендом, вёрстку, 
                        добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className="about-project__point">
                        <h3 className="about-project__point-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__point-text">У каждого этапа был мягкий и жёсткий дедлайн, 
                        которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className="infographic">
                    <div className="infographic__back">
                        <p className="infographic__back-visual">Back-end</p>
                        <p className="infographic__text">1 неделя</p>
                    </div>
                    <div className="infographic__front">
                        <p className="infographic__front-visual">Front-end</p>
                        <p className="infographic__text">4 недели</p>
                    </div>
                </div>
            </div>
        </section>
    )
}