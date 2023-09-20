import React, { useContext, useState, useEffect } from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { signin, signup } from "../../utils/MainApi";

export function Register() {
    const {loggedIn, setLoggedIn, openPopup} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [errorEmail, setErrorEmail] = useState('type your email');
    const [errorPassword, setErrorPassword] = useState('type your password');
    const [errorName, setErrorName] = useState('type your name');

    const [dataValid, setDataValid] = useState(false);

    useEffect(() => {
        if ( errorEmail || errorPassword || errorName ) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [errorEmail, errorPassword, errorName])

    function handleRegister() {
        signup({ name, email, password })
            .then(res => {
                if (res.message) {
                    openPopup(res.message);
                    return Promise.reject(res.message);
                } else {
                    return signin({ email, password });
                }
            })
            .then(res => {
                if (res.message) {
                    console.log(res.message);
                    return Promise.reject(res.message);
                } else {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    navigate("/movies");
                }
            })
            .catch(error => {
                console.log('hendleRegister error:', error);
            });
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
                                    <input className="register__input" 
                                        placeholder="how can we call you?" 
                                        minlength="2" maxlength="13"
                                        name="name"
                                        value={name}

                                    />
                                    <div className="register__error">Тестовая ошибка</div>
                                </label>
                            </div>
                            
                            <div className="register__input-container">
                                <label className="register__email">
                                    E-mail
                                    <input className="register__input" 
                                        placeholder="type your email here"
                                        name="email"
                                        value={email}
                                    />
                                    <div className="register__error">Тестовая ошибка</div>
                                </label>
                            </div>

                            <div className="register__input-container">
                                <label className="register__password">
                                    Пароль
                                    <input className="register__input" 
                                        placeholder="and your password here" 
                                        minlength="4" maxlength="10"
                                        name="password"
                                        value={password}
                                    />
                                    <div className="register__error" >Тестовая ошибка</div>
                                </label>
                            </div>
                        </fieldset>
                        <div className="register__submit-container">
                            <button type="submit" className="register__submit" onClick={handleRegister} disabled={!dataValid}>Зарегистрироваться</button>
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