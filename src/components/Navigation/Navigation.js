import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Burger } from "../Burger/Burger";
import accIcon from "../../images/account-icon.svg";

export function Navigation() {
    

    return (
            // {!logedIn && (
            //     <div className="navigation__no-auth">
            //         <Link className="navigation__button-signup">Регистрация</Link>
            //         <Link className="navigation__button-sigin">Войти</Link>
            //     </div>
            // )}

            // {logedIn && (
            //     
                <div className="navigation__auth">
                    <Link className="navigation__">Фильмы</Link>
                    <Link className="navigation__">Сохранённые фильмы</Link>

                    <Link className="navigation__account-button">
                        <img className="navigation__account-icon" alt="иконка аккаунта" src={accIcon}/>
                        <p className="navigation__account-text">Аккаунт</p>
                    </Link>

                    <Burger />
                </div>
            // )}
        
       
    )
}