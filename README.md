# Movie Searcher Server (API)


- A case study to search and display movie posters using The Open Movie Database (http://www.omdbapi.com/)


# Getting Started

### Prerequisites
- Node.js v8.x
- Docker v18.x

### How to run server
```sh
# Clone it
git clone git@github.com:gokceyucel/movie-searcher-server.git
cd movie-searcher-server

# Install dependencies
npm install

# Start development live-reload server
PORT=8080 npm run dev

# Start production server
PORT=8080 npm start
```

### How to run tests
```sh
npm test
```

### How to run in a container
```sh
cd movie-searcher-server

# Build your docker image
docker build -t movie-searcher-server .

# Run your docker container
docker run -p 8080:8080 movie-searcher-server
```

# Example endpoints
- GET /api
```sh
curl http://127.0.0.1:8080/api
> {"version":"0.1.0"}
```
- GET /api/search?keyword=\<your keyword>
```sh
curl "http://127.0.0.1:8080/api/search?keyword=future"
> [{"Title":"Back to the Future","Year":"1985","imdbID":"tt0088763","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}
...]
```
- GET /api/cache/refresh
```sh
curl "http://127.0.0.1:8080/api/cache/refresh"
> Cache refreshed
```

