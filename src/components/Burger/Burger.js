import React from "react";
import "./Burger.css";
import { Link } from "react-router-dom";
import burger from "../../images/burger-icon.svg";
import burgerClose from "../../images/burger-close.svg";
import { useState } from "react";

export function Burger() {

    const [burgerActive, setBurgerActive] = useState(false);

    return (
        <div className="burger">

            { !burgerActive &&
                <div className="burger__off">
                    <button type="button" className="burger__button" onClick={() => setBurgerActive(prev => !prev)}>
                        <img className="burger__logo" alt="иконка бургер-меню" src={burger}/>
                    </button>
                </div>
            }
        
            { burgerActive && 
                <div className="burger__on">
                    <div className="burger__open">
                        <button type="button" className="burger__close" onClick={() => setBurgerActive(prev => !prev)}>
                            <img className="burger__close-icon" alt="кнопка закрыть бургер-меню" src={burgerClose}/>
                        </button>

                        <nav className="burger__links">
                            <Link to="/" className="burger__link">Главная</Link>
                            <Link to="/movies" className="burger__link">Фильмы</Link>
                            <Link to="/saved-movies" className="burger__link">Сохранённые фильмы</Link>
                        </nav>

                        <Link to="/profile" className="burger__account-button">
                            <p className="burger__account-text">Аккаунт</p>
                            <div className="burger__account-icon" alt="иконка аккаунта"></div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}