import React from "react";
import { useState, createContext, useEffect } from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Popup } from "../Popup/Popup";
import { getSavedMovies, getUserInfo } from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setLoggedIn(false)
    } else {
      getUserInfo()
      .then(res => {
        if (res.message) {
          setLoggedIn(false)
          localStorage.removeItem('token')
          window.location.href = '/signin'
        } else {
          getSavedMovies()
            .then(res => {
              setSavedMovies(res)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(error => {
        console.log(error)
      })

    }
  }, [])

  const popupOpen = (text) => {
    setIsPopupOpen(true);
    setPopupText(text);
  }

  const popupClose = () => {
    setIsPopupOpen(false);
    setPopupText('');
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, popupOpen }}> 
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />

            <Route path="/movies" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies 
                    loggedIn={loggedIn}
                    savedMovies={savedMovies}
                    
              
                  />
                </ProtectedRoute>
              } 
            />
            <Route path="/saved-movies" element={
                <ProtectedRoute loggenIn={loggedIn}>
                  <SavedMovies
                    savedMovies={savedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Register/>}/>

            <Route path="/signin" element={<Login/>}/>

            <Route path="/profile" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile/>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Popup isOpen={isPopupOpen} popupText={popupText} onClose={popupClose}/>
        </div>
      </CurrentUserContext.Provider>
    </BrowserRouter>    
  );
}
  