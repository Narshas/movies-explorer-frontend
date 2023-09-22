import React from "react";
import { useState, createContext, useEffect } from "react";
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
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  // const navigate = useNavigate();
  
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
          // navigate('/signin')
          window.location.href = '/signin'
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

  const handleSearch = (searchQuery) => {
    searchQuery
  } 

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, popupOpen }}> 
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />

            <Route path="/movies" element={
                <ProtectedRoute loggenIn={loggedIn}>
                  <Movies searchQuery={searchQuery} handleSearch={handleSearch}/>
                </ProtectedRoute>
              } 
            />
            <Route path="/saved-movies" element={
                <ProtectedRoute loggenIn={loggedIn}>
                  <SavedMovies/>
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Register/>}/>

            <Route path="/signin" element={<Login/>}/>

            <Route path="/profile" element={
                <ProtectedRoute loggenIn={loggedIn}>
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
  