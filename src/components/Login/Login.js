import React, { useContext } from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";

export function Login() {

    const {loggedIn, setLoggedIn} = useContext(CurrentUserContext);

    const navigate = useNavigate();

    function handleLogin() {
        setLoggedIn(true);
        navigate("/movies")
    }

    return (
        <main>
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
                                    <input className="login__input" placeholder="type your email here" required/>
                                    <div className="login__error">Тестовая ошибка</div>
                                </label>
                            </div>

                            <div className="login__input-container">
                                <label className="login__password">
                                    Пароль
                                    <input className="login__input" placeholder="and your password here" required minlength="4" maxlength="10"/>
                                    <div className="login__error">Тестовая ошибка</div>
                                </label>
                            </div>

                        </fieldset>
                        <div className="login__submit-container">
                            <button type="submit" className="login__submit" onClick={handleLogin}>Войти</button>
                            <div className="login__link">
                                Ещё не зарегистрированы?
                                <Link to="/signup" className="login__to-register">Регистрация</Link>
                            </div>            
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
