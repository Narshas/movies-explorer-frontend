import React from "react";
import './App.css';
import { Main } from "../Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Main/>} />
          </Routes>
        </div>
    </BrowserRouter>    
  );
}
  