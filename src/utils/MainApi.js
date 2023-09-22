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