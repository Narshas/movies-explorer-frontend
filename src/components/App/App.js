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
import { getSavedMovies, getUserInfo, changeSaveStatus, tokenCheker, authoraizer } from "../../utils/MainApi";
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

  console.log("Rendering App component. Current loggedIn state:", loggedIn);

  const logOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/signin');
        console.log('logout called');
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
    console.log("Entered checkToken function");
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      tokenCheker(currentToken)
        .then(res => {
          if(res) {
            console.log("in tokenCheker loggedIn set to true");
            setLoggedIn(true);
            loadUserData();
          } else {
            return logOut();
          }
        })
        .catch((err) => {
          // setUser(null);
          console.log('tokenCheker bad result', err);
          return logOut();
        });
    } else {
      return logOut();
    }
  }

  useEffect(() => {
    console.log("Checking token on App mount");
    checkToken()
  }, [])

  function handleLogin(email, password) {
        console.log("Attempt to login with email:", email);
        authoraizer({ email, password })
          .then(res => {
              if (res && res.message) {
                  console.log(res.message);
              } else {
                  // setLoggedIn(true);
                  localStorage.setItem('token', res.token);
                  checkToken();
                  console.log("Login successful. Token received:", res.token);
                  navigate("/movies");
              }
          })
          .catch(error => {
              console.log(error)
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


  // ======== Movies =========

  const handleLike = (movie) => {
    console.log("handleLike called for movie:", movie);
    if (!savedMovies.some((i) => i.movieID === movie.id)) {
      return changeSaveStatus(movie, false)
        .then(res => {
          console.log("Before update:", savedMovies);
          setSavedMovies([res].concat(savedMovies));
          console.log("After update:", savedMovies);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return changeSaveStatus(movie, true)
        .then(res => {
          console.log("Saved movies after removing:", savedMovies);
          setSavedMovies(savedMovies => savedMovies.filter(i => i.movieID !== res.id));
        })
        .catch(err => {
          console.log(err);
        })
    }
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
  