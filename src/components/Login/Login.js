import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { authoraizer } from "../../utils/MainApi";

export function Login() {

    const {loggedIn, setLoggedIn} = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorEmail, setErrorEmail] = useState('type your email');
    const [errorPassword, setErrorPassword] = useState('type your password');
    const [dataValid, setDataValid] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    useEffect(() => {
        if ( errorEmail || errorPassword ) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [errorEmail, errorPassword])

    function handleLogin() {
        authoraizer({ email, password })
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

    function handleInputTouched(e) {
        const inputName = e.target.name;

        if (inputName === 'email') {
            setIsEmailTouched(true)
        } else if (inputName === 'password'){
            setIsPasswordTouched(true)
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

                    <form className="login__form" onSubmit={e => e.preventDefault()}>
                        <fieldset className="login__fieldset">
                            
                            <div className="login__input-container">
                                <label className="login__email">
                                    E-mail
                                    <input className="login__input" 
                                        placeholder="type your email here" 
                                        required
                                        name="email"
                                        value={email}
                                        type="email"
                                        onChange={e => handleInputEmail(e)}
                                    />
                                    <div className={`login__error ${ isEmailTouched && errorEmail ? "login__error_active" : ''}`}>{errorEmail}</div>
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
                                        type="password"
                                        value={password}
                                        onChange={e => handleInputPassword(e)}
                                    />
                                    <div className={`login__error ${ isPasswordTouched && errorPassword ? "login__error_active" : ''}`}>{errorPassword}</div>
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
