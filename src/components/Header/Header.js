import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 
import logo from "../../images/logo.svg";
import { Navigation } from "../Navigation/Navigation";
import { useState } from "react";
import { CurrentUserContext } from "../App/App";

export function Header() {

    const {loggedIn} = useContext(CurrentUserContext);

    return (
        <header className="header">
            <div className={loggedIn ? "header__loggedIn" : "header__loggedOut"}>
                <div className="header__container">
                    <Link to="/" className="header__logo">
                        <img src={logo} className="header__logo-image" alt="logo"/>
                    </Link>
                    <Navigation/>
                </div>
            </div>
           
        </header>
    );
}
