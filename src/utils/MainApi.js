const settings = {
    // baseUrl: "https://api.narshas.diploma.nomoreparties.co",
    baseUrl: "http://localhost:3001",
}

function testRes(res) {
    if (res.ok) {
        console.log("Response received from", res.url, "with status:", res.status);
        return res.json();
    }
    console.log("Error in response from", res.url, "with status:", res.status);
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function register({ name, password, email }) {
        console.log("Making request to:", '/signup');
        return fetch(`${settings.baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, password, email }),
        })
        .then(res => {
            return testRes(res);
        })
}

export function authoraizer({ password, email }) {
    console.log("Making request to:", '/signin');
    return fetch(`${settings.baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    })
    .then(res => {
        console.log("authoraizer called");
        return testRes(res);
        
    })
}


export function getUserInfo() {
    console.log("Making request to:", '/users/me');
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/users/me`, {
        headers: {
            // "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`,
        },
    })
    .then(res => {
        return testRes(res);
    })
}

export function patchUserInfo(userData) {
    console.log("Making request to:", '/users/me');
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`,
        },
        body: JSON.stringify(userData)
    })
    .then(res => {
        return testRes(res);
    })
}

export function changeSaveStatus(movieData, isSave) {
    const currentToken = localStorage.getItem('token');
    if (isSave) {
        return fetch(`${settings.baseUrl}/movies/${movieData._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}`,
            },
        })
        .then(res => {
            return testRes(res);
        })
    } else {
        return fetch(`${settings.baseUrl}/movies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}`,
            },
            body: JSON.stringify({
                movieId: movieData.id,
                nameRU: movieData.nameRU,
                nameEN: movieData.nameEN,
                director: movieData.director,
                country: movieData.country,
                year: movieData.year,                
                duration: movieData.duration,
                description: movieData.description,
                trailerLink: movieData.trailerLink,
                image: `https://api.nomoreparties.co${movieData.image.url}`,
                thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,                
            })
        })
        .then(res => {
            return testRes(res);
        })
    }
}

export function deleteMovie(movieData) {
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/movies/${movieData._id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`,
        },
    })
    .then(res => {
        return testRes(res);
    })
}

export function getSavedMovies() {
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/movies`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`,
        },
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.removeItem('token')
            return [];
        } else {
            return testRes(res)
        }
    })
}

export function tokenCheker(currentToken) {
    console.log("Making request to:", '/users/me');
    return fetch(`${settings.baseUrl}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${currentToken}`,
        },
    })
    .then(res => {
        return testRes(res);
    })
}