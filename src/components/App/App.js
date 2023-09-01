import React from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";

export function App() {
  return (
    <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/signup" element={<Register/>}/>
            <Route path="/signin" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/movies" element={<Movies/>} />
            <Route path="/saved-movies" element={<SavedMovies/>}/>
          </Routes>
        </div>
    </BrowserRouter>    
  );
}
  