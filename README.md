# Movies explorer

My graduation project at the Faculty of Web Development at Yandex Practicum.
Tools and tech stack: HTML, CSS, React, Express, MongoDB, NodeJS, API, Nginx, Postman.

Frontend: https://narshas.diploma.nomoreparties.co;
Backend: https://api.narshas.diploma.nomoreparties.co;
IP: 158.160.32.206;
Design: https://www.figma.com/file/fDHxhcffWWTvCCuiPF3I4D/light-1

## How it works

With this service after registering, you can find a movie and save it to your favorites:

- the server is deployed on express and the backend is installed on Yandex Cloud;
- logging, authentication and authorization on the server are implemented;
- the database is connected, schemas and models of API resources are created;
- the components are made on React, the layout is ported to them;
- pages: registration, authorization, profile editing, saved movies;
- asynchronous GET and POST requests to the API are implemented;;
- the received movies are filtered on the client side;

## How to run a project locally (if the backend is not available by url)

### Running the frontend (React)

1. Make sure you have Node.js installed. If not, download and install Node.js
2. git clone https://github.com/Narshas/movies-explorer-frontend.git
3. Navigate to the project folder: cd movies-explorer-frontend
4. npm install
5. npm start
6. go to http://localhost:3000

### Running the backend (Express, MongoDB)

1. git clone https://github.com/Narshas/movies-explorer-api.git
2. Navigate to the project folder: cd movies-explorer-api
3. npm install
4. npm run start
5. go to http://localhost:3001
