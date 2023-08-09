import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="navigation__button-wraper">
            <Link className="navigation__button-signup">Регистрация</Link>
            <Link className="navigation__button-sigin">Войти</Link>
        </div>
    )
}