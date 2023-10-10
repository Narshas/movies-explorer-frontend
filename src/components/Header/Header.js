import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 
import logo from "../../images/logo.svg";
import { Navigation } from "../Navigation/Navigation";
// import { CurrentUserContext } from "../App/App";
import { useLocation } from "react-router-dom";

export function Header() {
    const location = useLocation();

    // const {loggedIn} = useContext(CurrentUserContext);

    return (
        <header className="header">
            <div className={location.pathname === "/" ? "header__loggedOut" : "header__loggedIn"}>
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
