import React, { useContext } from "react";
import "./Navigation.css";
import { Link, useLocation, NavLink } from "react-router-dom";
import { Burger } from "../Burger/Burger";
import accIcon from "../../images/account-icon.svg";
import { CurrentUserContext } from "../App/App";

export function Navigation() {
    
    const {loggedIn} = useContext(CurrentUserContext);
    const location = useLocation();

    return (
        <>
            <div className="navigation">
                { location.pathname === "/" && !loggedIn && (
                    <div className="navigation__notauth">
                        <Link to="/signup" className="navigation__button-signup">Регистрация</Link>
                        <Link to="/signin" className="navigation__button-signin">Войти</Link>
                    </div>
                )}

                { location.pathname === "/" && loggedIn && (
                    <div className="navigation__auth">
                        <div className="navigation__container-auth">
                            <div className="navigation__films">
                                <NavLink to="/movies" className={({ isActive }) => isActive ? "navigation__all-films navigation__allfilms-active" : "navigation__all-films"}>Фильмы</NavLink>
                                <NavLink to="/saved-movies" className="navigation__my-films">Сохранённые фильмы</NavLink>
                            </div>

                            <Link to="/profile" className="navigation__account-button">
                                <p className="navigation__account-text">Аккаунт</p>
                                <div className="navigation__account-icon" alt="иконка аккаунта" src={accIcon}></div>
                            </Link>
                        </div>
                        <Burger />
                    </div>
                )}

                { location.pathname !== "/" && loggedIn && (
                    <div className="navigation__auth">
                        <div className="navigation__container-auth">
                            <div className="navigation__films">
                                <NavLink to="/movies" className={({ isActive }) => isActive ? "navigation__all-films navigation__allfilms-active" : "navigation__all-films"}>Фильмы</NavLink>
                                <NavLink to="/saved-movies" className={({ isActive }) => isActive ? "navigation__my-films navigation__myfilms-active" : "navigation__my-films"}>Сохранённые фильмы</NavLink>
                            </div>

                            <Link to="/profile" className="navigation__account-button">
                                <p className="navigation__account-text">Аккаунт</p>
                                <div className="navigation__account-icon" alt="иконка аккаунта" src={accIcon}></div>
                            </Link>
                        </div>
                        <Burger />
                    </div>
                )}
            </div>
        </>
            
        
       
    )
}