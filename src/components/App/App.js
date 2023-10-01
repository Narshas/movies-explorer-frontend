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
import { getSavedMovies, getUserInfo, changeSaveStatus } from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSaved, setIsSaved] = useState(false);


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

  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
        .then(res => {
          setUser(res);
          console.log("user", res);

          return getSavedMovies();
        })
        .then(res => {
          setSavedMovies(res)
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  const handleLike = (movie) => {
    if (!savedMovies.some((i) => i.movieID === movie.id)) {
      changeSaveStatus(movie, false)
        .then(res => {
          setSavedMovies([res].concat(savedMovies));
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      changeSaveStatus(movie, true)
        .then(res => {
          setSavedMovies(savedMovies => savedMovies.filter(i => i.movieID !== res.id));
        })
        .catch(err => {
          console.log(err);
        })
    }
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
                    handleLike={handleLike}
                    
              
                  />
                </ProtectedRoute>
              } 
            />
            <Route path="/saved-movies" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    savedMovies={savedMovies}
                    loggedIn={loggedIn}
                    handleLike={handleLike}
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
  