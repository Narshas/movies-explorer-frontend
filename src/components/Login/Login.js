import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { signin } from "../../MainApi";

export function Login() {

    const {loggedIn, setLoggedIn} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const [email, seEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('type your email');
    const [errorPassword, setErrorPassword] = useState('type your password');
    const [dataValid, setDataValid] = useState(false);

    useEffect(() => {
        if ( errorEmail || errorPassword ) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [errorEmail, errorPassword])

    function handleLogin() {
        signin({ email, password })
        .then(res => {
            if (res.message) {
                console.log(res.message)
            } else {
                setLoggedIn(true)
                localStorage.setItem('token', res.token)
                navigate("/movies")
            }
        })
        .catch(error => {
            console.log(error)
        });
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
                                    <input className="login__input" 
                                        placeholder="type your email here" 
                                        required
                                        name="email"
                                        value={email}
                                    />
                                    <div className="login__error">Тестовая ошибка</div>
                                </label>
                            </div>

                            <div className="login__input-container">
                                <label className="login__password">
                                    Пароль
                                    <input className="login__input" 
                                        placeholder="and your password here" 
                                        required 
                                        minlength="4" maxlength="10"
                                        name="password"
                                        value={password}
                                    />
                                    <div className="login__error">Тестовая ошибка</div>
                                </label>
                            </div>

                        </fieldset>
                        <div className="login__submit-container">
                            <button type="submit" className="login__submit" onClick={handleLogin} disabled={!dataValid}>Войти</button>
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
