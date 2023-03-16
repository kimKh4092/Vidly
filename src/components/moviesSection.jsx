
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './movies'
import { getMovies } from '../services/fakeMovieService';
import MovieForm from './pages/movieForm';
import NotFound from './pages/notFound';


class MoviesSection extends Component {
    state = {
        movies: getMovies()
    }
    render() {
        return (
            <Switch>
                <Route path='/movies' exact component={Movies} />
                {this.state.movies.map(movie =>
                    < Route key={movie._id} path={'/movies/' + movie._id} render={(props) => <MovieForm movieId={movie._id} {...props} />} />)
                }
                <Route path='/not-found' component={NotFound} />
                <Redirect to='/not-found' />


            </Switch>


        );
    }
}

export default MoviesSection;