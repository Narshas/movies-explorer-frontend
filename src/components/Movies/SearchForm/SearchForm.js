import React from "react";
import "./SearchForm.css";

export function SearchForm() {
    return(
        <form className="searchform">
            <div className="searchform__wraper">
                <input className="searchform__input"/>
                <button className="searchform__button"></button>
            </div>
            <label className="searchform__toggle">
                <input className="searchform__toggle-input"></input>
                <div className="searchform__toggle-css"></div>
                <p className="searchform__toggle-text">Короткометражки</p>
            </label>
        </form>
    );
}