import React from "react";
import { useState, createContext } from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Popup } from "../Popup/Popup";

export const CurrentUserContext = createContext();
const defoltUser = {name: 'Тестовый пользователь', email: 'test@email.com'}

export function App() {

  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);

  const mainApi = new MainApi({
    baseUrl: "https://api.narshas.diploma.nomoreparties.co";
    headers: {
      "Content-type": "application/json",
    }
  })

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{user, setUser, loggedIn, setLoggedIn}}> 
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
  