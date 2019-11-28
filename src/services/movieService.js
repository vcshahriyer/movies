import http from "./httpService";

function movieUrl(id) {
  return `/movies/${id}`;
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}
export function getMovies() {
  return http.get("/movies");
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post("/movies", movie);
}
