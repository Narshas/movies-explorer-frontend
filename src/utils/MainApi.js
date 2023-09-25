const settings = {
    baseUrl: "https://api.narshas.diploma.nomoreparties.co",
    headers: {
      "Content-type": "application/json",
    }
}

function testRes(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export function register({ name, password, email }) {
        return fetch(`${settings.baseUrl}/signup`, {
            method: 'POST',
            headers: settings.headers,
            body: JSON.stringify({ name, password, email }),
        })
        .then(res => testRes(res))
}

export function authoraizer({ password, email }) {
    return fetch(`${settings.baseUrl}/signin`, {
        method: 'POST',
        headers: settings.headers,
        body: JSON.stringify({ password, email }),
    })
    .then(res => testRes(res))
}


export function getUserInfo() {
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/users/me`, {
        headers: {
            // "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${currentToken}`,
        },
    })
    .then(res => testRes(res))
}

export function patchUserInfo(userData) {
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${currentToken}`,
        },
        body: JSON.stringify(userData)
    })
    .then(res => testRes(res))
}

export function changeSaveStatus(movieData, isSave) {
    const currentToken = localStorage.getItem('token');
    if (isSave) {
        return fetch(`${settings.baseUrl}/movies/${movieData.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${currentToken}`,
            },
        })
        .then(res => testRes(res))
    } else {
        return fetch(`${settings.baseUrl}/movies`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${currentToken}`,
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
                trailerLink: data.trailerLink,
                image: `https://api.nomoreparties.co${movieData.image.url}`,
                thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,                
            })
        })
        .then(res => testRes(res))
    }
}

export function getSavedFilms() {
    const currentToken = localStorage.getItem('token');
    return fetch(`${settings.baseUrl}/movies`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${currentToken}`,
        },
    })
    .then(res => {
        if (res.status === 401) {
            localStorage.removeItem('token')
            return [];
        } else {
            testRes(res)
        }
    })
}