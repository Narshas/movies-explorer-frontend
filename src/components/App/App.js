import React from "react";
import { useState, createContext, useEffect } from "react";
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import { Profile } from "../Profile/Profile";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Popup } from "../Popup/Popup";
import { getSavedMovies, getUserInfo, changeSaveStatus, tokenCheker, authoraizer, deleteMovie } from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  // ======== UserData =========

  useEffect(() => {
    checkToken()
  }, [])

  const logOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/signin'); 
  }

  const loadUserData = () => {
    Promise.all([getUserInfo(), getSavedMovies()])
    .then(([userInfo, savedMoviesList]) => {
        setUser(userInfo);
        setSavedMovies(savedMoviesList);
    })
    .catch(err => {
        console.log(err);
        logOut();
    });
  }

  const checkToken = () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      tokenCheker(currentToken)
        .then(res => {
          if(res) {
            setLoggedIn(true);
            loadUserData();
          } else {
            return logOut();
          }
        })
        .catch((err) => {
          console.log('tokenCheker bad result', err);
          return logOut();
        });
    } else {
      return logOut();
    }
  }  

  function handleLogin(email, password) {
        authoraizer({ email, password })
          .then(res => {
              if (res && res.message) {
                  console.log(res.message);
              } else {
                  localStorage.setItem('token', res.token);
                  checkToken();
                  navigate("/movies");
              }
          })
          .catch(error => {
              console.log(error)
              if (error .code === 500) {
                popupOpen('Wrong password or email')
              }
              if (error .code === 401) {
                popupOpen('We have an error on server')
              }
          });
  }

  // ======== Support =========
  const popupOpen = (text) => {
    setIsPopupOpen(true);
    setPopupText(text);
  }

  const popupClose = () => {
    setIsPopupOpen(false);
    setPopupText('');
  }

  useEffect(() => {
    if (PageNotFound) {
      navigate();
    } else {
      const lastRoute = window.sessionStorage.getItem("lastRoute");
      if (lastRoute) {
          navigate(JSON.parse(lastRoute));
      }
    }
    const handleBeforeUnload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, PageNotFound]);

  // ======== Movies =========

  const handleLike = (movieCard) => {
    if (!savedMovies.some(i => i.movieID === movieCard.id)) {
      return changeSaveStatus(movieCard, false)
        .then(res => {
          setSavedMovies(prevMovies => [res, ...prevMovies]);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return changeSaveStatus(movieCard, true)
        .then(res => {
          setSavedMovies(prevMovies => prevMovies.filter(i => i.movieID !== res.movieID));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const handleDeleteMovie = (movieCard) => {
    return deleteMovie(movieCard)
      .then(res => {
        setSavedMovies(prevMovies => prevMovies.filter(i => i.movieID !== res.movieID));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
      <CurrentUserContext.Provider value={{ loggedIn, setLoggedIn, popupOpen }}> 
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
                    handleDeleteMovie={handleDeleteMovie}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={
              <Register
          
              />
            }
            />

            <Route path="/signin" element={
              <Login
                handleLogin={handleLogin}
              />
            }
            />

            <Route path="/profile" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    user={user}
                    setUser={setUser}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Popup isOpen={isPopupOpen} popupText={popupText} onClose={popupClose}/>
        </div>
      </CurrentUserContext.Provider>   
  );
}
  