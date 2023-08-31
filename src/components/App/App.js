import React from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile"

export function App() {
  return (
    <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/signup"/>
            <Route path="/signin"/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/movies" element={<Movies/>} />
            <Route path="/saved-movies" element={<SavedMovies/>}/>
          </Routes>
        </div>
    </BrowserRouter>    
  );
}
  