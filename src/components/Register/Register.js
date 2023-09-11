import React, { useContext } from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { Main } from "../Main/Main";

export function Register() {
    const {loggedIn, setLoggedIn} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    function handleRegister() {
        setLoggedIn(true);
        navigate("/movies")
    }

    return (
        <main>
            <section className="register">
                <div className="register__container">
                    <div className="register__logo-wraper">
                        <Link to="/">
                            <img className="register__logo" src={logo} alt="Лого"/>
                        </Link>
                    </div>

                    <h2 className="register__title">Добро пожаловать!</h2>

                    <form className="register__form">
                        <fieldset className="register__fieldset">
                            <div className="register__input-container">
                                <label className="register__name">
                                    Имя
                                    <input className="register__input" placeholder="how can we call you?" minlength="2" maxlength="13"/>
                                    <div className="register__error">Тестовая ошибка</div>
                                </label>
                            </div>
                            
                            <div className="register__input-container">
                                <label className="register__email">
                                    E-mail
                                    <input className="register__input" placeholder="type your email here"/>
                                    <div className="register__error">Тестовая ошибка</div>
                                </label>
                            </div>

                            <div className="register__input-container">
                                <label className="register__password">
                                    Пароль
                                    <input className="register__input" placeholder="and your password here" minlength="4" maxlength="10"/>
                                    <div className="register__error" >Тестовая ошибка</div>
                                </label>
                            </div>
                        </fieldset>
                        <div className="register__submit-container">
                            <button type="submit" className="register__submit" onClick={handleRegister}>Зарегистрироваться</button>
                            <div className="register__link">
                                Уже зарегистрированы?
                                <Link to="/signin" className="register__to-login">Войти</Link>
                            </div>            
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}