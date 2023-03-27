
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './movies'
import { getMovies, deleteMovie } from '../services/movieService';
import MovieForm from './forms/movieForm';
import NotFound from './pages/notFound';
import http from '../services/httpService';
import { getCurrentUser } from '../services/authService';

class MoviesSection extends Component {
    state = {
        movies: []
    }

    async componentDidMount() {
        const { data: movies } = await getMovies();
        this.setState({ movies })
    }

    saveMovie = async (movie, id) => {

        const movies = [...this.state.movies]
        let movieInDb = movies.find(m => m._id === id) || {};
        movieInDb.title = movie.title;
        movieInDb.genre = {};
        movieInDb.genre.name = movie.genre;
        movieInDb.numberInStock = movie.numbInStock;
        movieInDb.dailyRentalRate = movie.rate;

        if (!movieInDb._id) {

            movieInDb._id = Date.now();
            movieInDb.genre._id = movieInDb._id;
            console.log(movieInDb)
            const { data: movie } = await http.post('http://localhost:3900/api/movies', movieInDb);
            movies.push(movie);

        }
        else {
            const body = { ...movieInDb };
            delete body._id;
            const { data: movie } = await http.put('http://localhost:3900/api/movies/' + movieInDb._id, body);
            movies.push(movie);
        }

    }

    handleDelete = (id) => {
        const originalMovies = this.state.movies;
        const allMovies = [...this.state.movies].filter(m => m._id !== id)
        this.setState({ movies: allMovies });

        try {
            deleteMovie(id);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 404) {
                alert('this movie has already been deleted')
            }
            this.setState({ movies: originalMovies })
        }

    }

    render() {
        const { user } = this.props;
        const currentUser = getCurrentUser()
        return (

            <Switch>


                <Route path='/movies' exact render={() => <Movies
                    onDelete={this.handleDelete}
                    movies={this.state.movies}
                    user={user} />} />

                {this.state.movies.map(movie =>
                    < Route key={movie._id} path={'/movies/' + movie._id} render={(props) => <MovieForm
                        title={movie.title}
                        genre={movie.genre.name}
                        numbInStock={movie.numberInStock}
                        rate={movie.dailyRentalRate}
                        movieId={movie._id} {...props}
                        onSave={this.saveMovie} />} />)
                }
                <Route path='/movies/new' render={(props) => {
                    if (currentUser) {

                        return <MovieForm
                            genre=''
                            title=''
                            rate=''
                            numbInStock=''
                            movieId=''
                            {...props}
                            onSave={this.saveMovie} />
                    }
                    //error
                    //gonna check later
                    if (!currentUser) {

                        return <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    }

                }
                } />
                <Route path='/not-found' component={NotFound} />
                <Redirect to='/not-found' />


            </Switch>


        );
    }
}

export default MoviesSection;