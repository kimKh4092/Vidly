import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleDelete = (id) => {
        // let movies = this.state.movies.filter(m => m._id !== id);
        // this.setState({ movies });
        let index = this.state.movies.find(m => m._id !== id);
        this.state.movies.splice(index, 1);
        this.setState({ movies: this.state.movies });


    }

    renderNumber() {
        if (this.state.movies.length === 0) return <p>there are no movies in the database</p>

        return <p>showing {this.state.movies.length} movies in the database</p>
    }


    render() {
        return (<div>
            <p className='m-4'>{this.renderNumber()} </p>
            <table className='table m-4'>
                <thead>
                    <tr>
                        <th >Title</th>
                        <th >Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.movies.map(movie =>
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><button onClick={() => this.handleDelete(movie._id)} className='btn btn-danger btn-sm m-2'>Delete</button></td>

                        </tr >


                    )}


                </tbody>
            </table>

        </div>);
    }
}

export default Movies;