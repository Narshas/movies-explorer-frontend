import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 
import logo from "../../images/logo.svg";
import { Navigation } from "../Navigation/Navigation";
import { useState } from "react";

export function Header() {

    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <header className={loggedIn ? "header__loggedIn" : "header__loggedOut"}>
            <div className="header__container">
                <Link className="header__logo">
                    <img src={logo} className="header__logo-image" alt="logo"/>
                </Link>
                <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> 
                {/* блок с кнопками */}
            </div>
        </header>
    );
}
