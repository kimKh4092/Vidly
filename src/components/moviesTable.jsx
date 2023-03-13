import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './likeComponent';
import Pag from './pagination';
import { getGenres } from '../services/fakeGenreService';
import GenreList from './genreList';

class Movies extends Component {
    state = {
        movies: getMovies(),
        moviesToShow: getMovies(),
        numbPerPage: 4,
        pageNumber: 1,
        genres: getGenres()
    }

    handleDelete = (id) => {
        let movies = this.state.moviesToShow.filter(m => m._id !== id);
        // this.setState({ movies });
        // let index = this.state.moviesToShow.find(m => m._id !== id);
        // this.state.moviesToShow.splice(index, 1);
        this.setState({ moviesToShow: movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.moviesToShow];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].isLiked = !movies[index].isLiked;
        this.setState({ moviesToShow: movies });
    }

    handlePag = (page) => {

        this.setState({ pageNumber: page });
    }

    handleFilter = (genre) => {
        console.log(genre);

    }

    renderNumber() {
        if (this.state.movies.length === 0) return <p>there are no movies in the database</p>

        return <p>showing {this.state.movies.length} movies in the database</p>
    }


    render() {

        return (<div className='row'>
            <div className='col-3 m-3'><GenreList onFilter={this.handleFilter} genres={this.state.genres} /></div>
            <div className='col-8'>
                <p className='m-4'>{this.renderNumber()} </p>
                <table className='table m-4'>
                    <thead>
                        <tr>
                            <th >Title</th>
                            <th >Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.moviesToShow.slice(this.state.numbPerPage * (this.state.pageNumber - 1), this.state.numbPerPage * (this.state.pageNumber - 1) + this.state.numbPerPage).map(movie =>
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like getLiked={() => this.handleLike(movie)} liked={movie.isLiked} /></td>
                                <td><button
                                    onClick={() => this.handleDelete(movie._id)}
                                    className='btn btn-danger btn-sm m-2'>Delete</button></td>


                            </tr >


                        )}
                    </tbody>
                </table>

                <Pag numbOfPages={(this.state.moviesToShow.length / this.state.numbPerPage) + 1}
                    onClick={this.handlePag}
                    pageNumber={this.state.pageNumber} />
            </div>




        </div>);
    }
}

export default Movies;