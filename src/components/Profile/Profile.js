import React, { useContext, useState, useEffect }  from "react";
import { Header } from "../Header/Header";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../App/App";
import { getUserInfo, patchUserInfo } from "../../utils/MainApi";

export function Profile() {
    const { loggedIn, setLoggedIn, user, setUser, openPopup } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const {isPatched, setIsPatched} = useState(false);

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
        navigate("/signin");
        localStorage.clear();
    }

    function handlePatchUser({ name, email }) {
        patchUserInfo({ name, email })
        .then(res => {
            setUser(res)
            if (res.message) {
                openPopup(res.message)
            } else {
                openPopup("you have just updated your profile")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <main>
                <Header/>
                <section className="profile">
                    <div className="profile__container">
                        <h2 className="profile__title">Привет, {user ? user.name : ''}</h2>
                        {/* {user ? user.name : ''} */}
                        <form className="profile__form">
                            <fieldset className="profile__fieldset">
                                <label className="profile__label">
                                    <p className="profile__caption">Имя</p>
                                    <input className="profile__name" 
                                        placeholder="how can we call you?" 
                                        required 
                                        minlength="2" maxlength="13"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                                <label className="profile__label">
                                    <p className="profile__caption">E-mail</p>
                                    <input className="profile__email" 
                                        placeholder="your@email.com" 
                                        required
                                        name={email}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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