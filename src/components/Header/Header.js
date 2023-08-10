import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 
import { logo } from "../../images/logo.svg";
import { Navigation } from "../Navigation/Navigation";

export function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link className="header__logo">
                    <img src={logo} className="header__logo-image" alt="logo"/>
                </Link>
                <Navigation/> 
                {/* блок с кнопка */}
            </div>
        </header>
    );
}
