import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { Burger } from "../Burger/Burger";
import accIcon from "../../images/account-icon.svg";

export function Navigation(props) {
    


    return (
        <>
            { !props.loggedIn && (
                <div className="navigation__notauth">
                    <Link to="/signup" className="navigation__button-signup">Регистрация</Link>
                    <Link to="/signin" className="navigation__button-signin">Войти</Link>
                </div>
            )}

            { props.loggedIn && (
                <div className="navigation__auth">
                    <div className="navigation__container-auth">
                        <div className="navigation__films">
                            <Link to="/movies" className="navigation__all-films">Фильмы</Link>
                            <Link to="/saved-movies" className="navigation__my-films">Сохранённые фильмы</Link>
                        </div>

                        <Link to="/profile" className="navigation__account-button">
                            <p className="navigation__account-text">Аккаунт</p>
                            <div className="navigation__account-icon" alt="иконка аккаунта" src={accIcon}></div>
                        </Link>
                    </div>
                    <Burger />
                </div>
            )}
        </>
            
        
       
    )
}