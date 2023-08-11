import React from "react";
import "./Burger.css";
import { Link } from "react-router-dom";
import accIcon from "../../images/account-icon.svg";
import burger from "../../images/burger-icon.svg";
import burgerClose from "../../images/burger-close.svg";

export function Burger() {
 return (
    <div className="burger">

        <div className="burger__off">
            <button className="burger__button">
                <img className="burger__logo" alt="иконка бургер-меню" src={burger}/>
            </button>
        </div>

        <div className="burger__on">
            <div className="burger__open">
                <button className="burger__button">
                    <img className="burger__logo" alt="икнока бургер-меню" src={burgerClose}/>
                </button>

                <nav className="burger__links">
                    <Link className="burger__link">Главная</Link>
                    <Link className="burger__link">Фильмы</Link>
                    <Link className="burger__link">Сохранённые фильмы</Link>
                </nav>

                <nav className="burger__account-container">
                    <div className="burger__account">
                        <Link className="burger__account-button">
                            <img className="burger__account-icon" alt="иконка аккаунта" src={accIcon}/>
                            <p className="burger__account-text">Аккаунт</p>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    </div>
 )
}