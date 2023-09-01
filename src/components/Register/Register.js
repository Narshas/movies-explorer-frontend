import React from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

export function Register() {
    return (
        <section className="register">
            <div className="register__container">
                <div className="register__logo-wraper">
                    <Link>
                        <img className="register__logo" src={logo} alt="Лого"/>
                    </Link>
                </div>

                <h2 className="register__title">Добро пожаловать!</h2>

                <form className="register__form">
                    <fieldset className="register__fieldset">
                        <div className="register__input-container">
                            <label className="register__name">
                                Имя
                                <input className="register__input"/>
                                <div className="register__error">Тестовая ошибка</div>
                            </label>
                        </div>
                        
                        <div className="register__input-container">
                            <label className="register__email">
                                E-mail
                                <input className="register__input"/>
                                <div className="register__error">Тестовая ошибка</div>
                            </label>
                        </div>

                        <div className="register__input-container">
                            <label className="register__password">
                                Пароль
                                <input className="register__input"/>
                                <div className="register__error">Тестовая ошибка</div>
                            </label>
                        </div>
                    </fieldset>
                    <div className="register__submit-container">
                        <button className="register__submit">Зарегистрироваться</button>
                        <div className="register__link">
                            Уже зарегистрированы?
                            <Link className="register__to-login">Войти</Link>
                        </div>            
                    </div>
                </form>
            </div>
        </section>
    )
}