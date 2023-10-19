import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";

export function Login({handleLogin, isSubmitting}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [dataValid, setDataValid] = useState(false);

    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    

    const { loggedIn } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loggedIn) {
            navigate('/movies');
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if ( errorEmail || errorPassword || !email || !password) {
            setDataValid(false)
        } else {
            setDataValid(true)
        }
    }, [errorEmail, errorPassword, email, password])

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
                                        name="email"
                                        value={email}
                                        type="email"
                                        onBlur={e => handleInputEmail(e)}
                                        onChange={handleChangeEmail}
                                    />
                                    <div className={`login__error ${ isEmailTouched && errorEmail ? "login__error_active" : ''}`}>{errorEmail}</div>
                                </label>
                            </div>

                            <div className="login__input-container">
                                <label className="login__password">
                                    Пароль
                                    <input className="login__input" 
                                        placeholder="and your password here"
                                        minLength="4" maxLength="10"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onBlur={e => handleInputPassword(e)}
                                        onChange={handleChangePassword}
                                    />
                                    <div className={`login__error ${ isPasswordTouched && errorPassword ? "login__error_active" : ''}`}>{errorPassword}</div>
                                </label>
                            </div>

                        </fieldset>
                        <div className="login__submit-container">
                            <button type="submit" className="login__submit" onClick={() => handleLogin(email, password)} disabled={!dataValid || isSubmitting}>Войти</button>
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
