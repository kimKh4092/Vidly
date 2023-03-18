
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './movies'
import { getMovies, saveMovie } from '../services/fakeMovieService';
import MovieForm from './forms/movieForm';
import NotFound from './pages/notFound';


class MoviesSection extends Component {
    state = {
        movies: getMovies()
    }

    saveMovie = (movie, id) => {
        console.log(movie);
        const movies = [...this.state.movies]
        let movieInDb = movies.find(m => m._id === id) || {};
        movieInDb.title = movie.title;
        movieInDb.genre = {};
        movieInDb.genre.name = movie.genre;
        movieInDb.numberInStock = movie.numbInStock;
        movieInDb.dailyRentalRate = movie.rate;

        if (!movieInDb._id) {
            movieInDb._id = Date.now();
            movies.push(movieInDb);
        }

        this.setState({ movies })
    }


    handleDelete = (id) => {
        let movie = this.state.movies.find(m => m._id === id);
        let index = this.state.movies.indexOf(movie);
        const allMovie = [...this.state.movies];
        allMovie.splice(index, 1);
        this.setState({ movies: allMovie });

    }

    render() {
        return (
            <Switch>
                <Route path='/movies' exact render={() => <Movies movies={this.state.movies} onDelete={this.handleDelete} />} />

                {this.state.movies.map(movie =>
                    < Route key={movie._id} path={'/movies/' + movie._id} render={(props) => <MovieForm
                        title={movie.title}
                        genre={movie.genre.name}
                        numbInStock={movie.numberInStock}
                        rate={movie.dailyRentalRate}
                        movieId={movie._id} {...props}
                        onSave={this.saveMovie} />} />)
                }
                <Route path='/movies/new' render={(props) => <MovieForm
                    genre=''
                    title=''
                    rate=''
                    numbInStock=''
                    movieId=''
                    {...props}
                    onSave={this.saveMovie} />} />
                <Route path='/not-found' component={NotFound} />
                <Redirect to='/not-found' />


            </Switch>


        );
    }
}

export default MoviesSection;