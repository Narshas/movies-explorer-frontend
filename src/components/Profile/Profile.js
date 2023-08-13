import React from "react";
import { Header } from "../Header/Header";
import "./Profile.css";

export function Profile() {
    return (
        <>
        <Header/>
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__title">Привет, тестовый пользователь</h2>
                {/* {user ? user.name : ''} */}
                <form className="profile__form">
                    <fieldset className="profile__fieldset">
                        <label className="profile__label">
                            <p className="profile__caption">Имя</p>
                            <input className="profile__name"/>
                        </label>
                        <label className="profile__label">
                            <p className="profile__caption">E-mail</p>
                            <input className="profile__email"/>
                        </label>
                    </fieldset>
                    <div className="profile__buttons">
                        <button className="profile__edit"></button>
                        <button className="profile__signout"></button>
                    </div>
                </form>
            </div>
        </section>
        </>
    );
}