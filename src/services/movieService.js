import http from './httpService'

export function getMovies() {
    return http.get('http://localhost:3900/api/movies')
}

export function deleteMovie(id) {
    return http.delete('http://localhost:3900/api/movies/' + id)

}

export function saveMovie(movie, id) {

}