import React from "react";
import { useState, createContext } from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movie";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Popup } from "../Popup/Popup";
import { getUserInfo } from "../../utils/MainApi";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoggedIn(false)
    } else {
      getUserInfo()
      .then(res => {
        if (res.message) {
          setLoggedIn(false)
          localStorage.removeIten('token')
          navigate('/signin')
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }, [])

  const openPopup = (text) => {
    setPopupOpen(true);
    setPopupText(text);
  }

  const closePopup = () => {
    setPopupOpen(false);
    setPopupText('');
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, openPopup }}> 
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/movies" element={<Movies/>} />
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/signup" element={<Register/>}/>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Popup/>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>    
  );
}
  