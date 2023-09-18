export function getMovies() {
    return fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then((res) => {
            return res.json();
        })
        .catch(error => {
            console.error(error);
        });
}