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
import { getSavedMovies, getUserInfo, changeSaveStatus, tokenCheker, authoraizer, deleteMovie, register } from "../../utils/MainApi";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export const CurrentUserContext = createContext();
const defoltUser = {name: '', email: ''}

export function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(defoltUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);

  const [appInitialized, setAppInitialized] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  

  // ======== UserData =========

  useEffect(() => {
    checkToken()
  }, [])  

  useEffect(() => {
    if (loggedIn) {
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
  }, [loggedIn]);

  const checkToken = () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      tokenCheker(currentToken)
        .then(res => {
          if(res) {
            setLoggedIn(true);
            // loadUserData();
          } else {
            return logOut();
          }
        })
        .catch((err) => {
          console.log('tokenCheker bad result', err);
          return logOut();
        })
        .finally(() => {
          setAppInitialized(true);
        })
    } else {
      logOut();
      setAppInitialized(true);
    }
  } 

  function handleLogin(email, password) {
    setIsSubmitting(true);
        authoraizer({ email, password })
          .then(res => {
              if (res && res.message) {
                  console.log(res.message);
                  popupOpen(res.message);
                  return Promise.reject(res.message);
              } else {
                  localStorage.setItem('token', res.token);
                  // navigate("/movies");
                  console.log('started checkToken()');
                  return checkToken();
              }
          })
          .then(() => {
            console.log('ready to navigate');
            navigate("/movies");
            console.log('navigated');
          })
          .catch(error => {
              console.log(error)
              if (error === 'Ошибка: 500') {
                popupOpen('We have an error on server')
              }
              if (error === 'Ошибка: 401') {
                popupOpen('Wrong password or email')
              }
          })
          .finally(() => {
            setIsSubmitting(false);
          })
  }

  function handleRegister(name, email, password) {
    setIsSubmitting(true);
    register({ name, email, password })
        .then(res => {
            if (res & res.message) {
                console.log(res.message)
                popupOpen(res.message);
                return Promise.reject(res.message);
            } else {
                handleLogin(email, password)
            }
        })
        .catch(error => {
          console.log(error)
          if (error === 'Ошибка: 500') {
              popupOpen('We have an error on server');
          }
          if (error === 'Ошибка: 409') {
              popupOpen('We already have a user with this email');
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        })
  }

  // ======== Support =========
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/signin'); 
  }

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
    console.log('saved movies before put like', savedMovies)
    if (!savedMovies.some(i => i.movieId === movieCard.id)) {
      return changeSaveStatus(movieCard, false)
        .then(res => {
          console.log('что возвращает putlike', res);
          setSavedMovies(prevMovies => [res, ...prevMovies]);
          console.log('savedMovies после like — в app', savedMovies);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const deletedMovie = savedMovies.find(i => i.movieId === movieCard.id);
      if (deletedMovie && deletedMovie._id) {
        return changeSaveStatus(deletedMovie, true)
          .then(res => {
            console.log('что возвращает dislike', res);
            // setSavedMovies(prevMovies => prevMovies.filter(i => i.movieId !== res.movieId));
            setSavedMovies(prevMovies => prevMovies.filter(i => i.movieId !== movieCard.id));
            console.log('savedMovies после like — в app', savedMovies);
          })
          .catch(err => { 
            console.log(err);
          })
      } else {
        console.log('this movie is not in SavedMovies');
      }
      
    }
  }

  const handleDeleteMovie = (movieCard) => {
    return deleteMovie(movieCard)
      .then(() => {
        setSavedMovies(prevMovies => prevMovies.filter(i => i._id !== movieCard._id))
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={{ loggedIn, setLoggedIn, popupOpen, user, setUser }}> 
      <div className="app">
        {appInitialized ? (
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
              <>
                <Register
                  handleRegister={handleRegister}
                  isSubmitting={isSubmitting}
                />
              </>
            }
            />

            <Route path="/signin" element={
              <>
                <Login
                  handleLogin={handleLogin}
                  isSubmitting={isSubmitting}
                />
              </>
            }
            />

            <Route path="/profile" element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        ) : null}
        <Popup isOpen={isPopupOpen} popupText={popupText} onClose={popupClose}/>
      </div>
    </CurrentUserContext.Provider>   
  );
}
  