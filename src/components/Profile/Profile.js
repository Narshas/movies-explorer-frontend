import React, { useContext, useState, useEffect }  from "react";
import { Header } from "../Header/Header";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { getUserInfo, patchUserInfo } from "../../utils/MainApi";

export function Profile() {
    const { setLoggedIn, popupOpen, user, setUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [isPatched, setIsPatched] = useState(false);

    useEffect(() => {
        getUserInfo()
            .then(res => {
                setUser(res)
                setEmail(res.email)
                setName(res.name)
            })
            .catch(error => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        if ( user.name !== name || user.email !== email ) {
            setIsPatched(true)
        } else {
            setIsPatched(false)
        }
    }, [email, name])

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.clear();
        navigate("/");
    }

    function handlePatchUser({ name, email }) {
        patchUserInfo({ name, email })
            .then(res => {
                setUser(res)
                if (res.message) {
                    popupOpen(res.message)
                } else {
                    popupOpen("you have just updated your profile")
                }
            })
            .catch(error => {
                console.log(error)
                if (error.code === 500) {
                    popupOpen('We have an error on server');
                }
                if (error.code === 409) {
                    popupOpen('We already have a user with this email');
                }
            })
    }

    function handleInputName (e) {
        const validationRegx = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/
        if (validationRegx.test(String(e.target.value))) {
            setName(e.target.value)
        } else {
            popupOpen('invalid name')
        }

    }

    function handleInputEmail (e) {
        const validationRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (validationRegx.test(String(e.target.value).toLowerCase())) {
            setEmail(e.target.value)
        } else {
            popupOpen("invalid email")
        }
    }

    function handleChangeName (e) {
        setName(e.target.value);
        handleInputName(e);
    }

    function handleChangeEmail (e) {
        setEmail(e.target.value);
        handleInputEmail(e);
    }

    return (
        <>
            <main>
                <Header/>
                <section className="profile">
                    <div className="profile__container">
                        <h2 className="profile__title">Привет, {user ? user.name : ''}</h2>
                        {/* {user ? user.name : ''} */}
                        <form className="profile__form" onSubmit={e => e.preventDefault()}>
                            <fieldset className="profile__fieldset">
                                <label className="profile__label">
                                    <p className="profile__caption">Имя</p>
                                    <input className="profile__name" 
                                        placeholder="how can we call you?" 
                                        required 
                                        minLength="2" maxLength="13"
                                        value={name}
                                        name="name"
                                        onBlur={(e) => handleInputName(e)}
                                        onChange={handleChangeName}
                                        type="text"
                                    />
                                </label>
                                <label className="profile__label">
                                    <p className="profile__caption">E-mail</p>
                                    <input className="profile__email" 
                                        placeholder="your@email.com" 
                                        required
                                        name="email"
                                        value={email}
                                        onBlur={(e) => handleInputEmail(e)}
                                        onChange={handleChangeEmail}
                                        type="email"
                                    />
                                </label>
                            </fieldset>
                            <div className="profile__buttons">
                                <button type="submit" className="profile__edit" onClick={() => handlePatchUser({name, email})} disabled={!isPatched}>Редактировать</button>
                                <button type="button" className="profile__signout" onClick={handleLogout}>Выйти из аккаунта</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}