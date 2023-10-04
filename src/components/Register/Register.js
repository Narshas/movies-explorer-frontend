import React, { useContext, useState, useEffect } from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { authoraizer, register } from "../../utils/MainApi";

export function Register() {
    const navigate = useNavigate();
    const {setLoggedIn, popupOpen} = useContext(CurrentUserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorName, setErrorName] = useState('');

    const [dataValid, setDataValid] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isNameTouched, setIsNameTouched] = useState(false);

    function handleRegister() {
        register({ name, email, password })
            .then(res => {
                if (res.message) {
                    popupOpen(res.message);
                    return Promise.reject(res.message);
                } else {
                    return authoraizer({ email, password });
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

    useEffect(() => {
        if ( errorEmail || errorPassword || errorName ) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [errorEmail, errorPassword, errorName])

    function handleInputTouched(e) {
        const inputName = e.target.name;

        if (inputName === 'email') {
            setIsEmailTouched(true)
        } else if (inputName === 'password'){
            setIsPasswordTouched(true)
        } else if (inputName === 'name') {
            setIsNameTouched(true)
        }
    }

    function handleInputName(e) {
        handleInputTouched(e)
        const validationRegx = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/
        if (validationRegx.test(String(e.target.value))) {
            setName(e.target.value)
            setErrorName('')
        } else {
            setErrorName('invalid name')
        }
    }

    function handleInputEmail(e) {
        handleInputTouched(e)
        const validationRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (validationRegx.test(String(e.target.value).toLowerCase())) {
            setEmail(e.target.value)
            setErrorEmail('')
        } else {
            setErrorEmail('invalid email')
        }
    }

    function handleInputPassword(e) {
        handleInputTouched(e)
        if (e.target.value.length > 3 && e.target.value.length < 11) {
            setPassword(e.target.value)
            setErrorPassword('')
        } else {
            setErrorPassword('invalid password')
        }
    }

    function handleChangeName(e) {
        setName(e.target.value);
        handleInputName(e);  
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        handleInputEmail(e);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
        handleInputPassword(e);
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
                                        minLength="2" maxLength="13"
                                        name="name"
                                        value={name}
                                        onBlur={e => handleInputName(e)}
                                        type="text"
                                        onChange={handleChangeName}
                                    />
                                    <div className={`register__error ${ isNameTouched && errorName ? "register__error_active" : '' }`}>{errorName}</div>
                                </label>
                            </div>
                            
                            <div className="register__input-container">
                                <label className="register__email">
                                    E-mail
                                    <input className="register__input" 
                                        placeholder="type your email here"
                                        name="email"
                                        value={email}
                                        onBlur={e => handleInputEmail(e)}
                                        type="email"
                                        onChange={handleChangeEmail}
                                    />
                                    <div className={`register__error ${ isEmailTouched && errorEmail ? "register__error_active" : '' }`}>{errorEmail}</div>
                                </label>
                            </div>

                            <div className="register__input-container">
                                <label className="register__password">
                                    Пароль
                                    <input className="register__input" 
                                        placeholder="and your password here" 
                                        minLength="4" maxLength="10"
                                        name="password"
                                        value={password}
                                        type="password"
                                        onBlur={e => handleInputPassword(e)}
                                        onChange={handleChangePassword}

                                    />
                                    <div className={`register__error ${ isPasswordTouched && errorPassword ? "register__error_active" : '' }`} >{errorPassword}</div>
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