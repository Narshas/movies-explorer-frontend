import React from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("/movies")
    }

    return (
        <section className="login">
            <div className="login__container">
                <div className="login__logo-wraper">
                    <Link to="/">
                        <img className="login__logo" src={logo} alt="Лого"/>
                    </Link>
                </div>

                <h2 className="login__title">Рады видеть!</h2>

                <form className="login__form">
                    <fieldset className="login__fieldset">
                        
                        <div className="login__input-container">
                            <label className="login__email">
                                E-mail
                                <input className="login__input"/>
                                <div className="login__error">Тестовая ошибка</div>
                            </label>
                        </div>

                        <div className="login__input-container">
                            <label className="login__password">
                                Пароль
                                <input className="login__input"/>
                                <div className="login__error">Тестовая ошибка</div>
                            </label>
                        </div>

                    </fieldset>
                    <div className="login__submit-container">
                        <button className="login__submit" onClick={handleLogin}>Войти</button>
                        <div className="login__link">
                            Ещё не зарегистрированы?
                            <Link to="/signup" className="login__to-register">Регистрация</Link>
                        </div>            
                    </div>
                </form>
            </div>
        </section>
    );
}
