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
        genres: getGenres(),
        filteredGenre: 'All Genre'
    }

    handleDelete = (id) => {
        let movies = this.state.moviesToShow.filter(m => m._id !== id);
        let movie = this.state.movies.find(m => m._id === id);
        let index = this.state.movies.indexOf(movie);
        const allMovie = [...this.state.movies];
        allMovie.splice(index, 1);
        this.setState({ movies: allMovie, moviesToShow: movies });
    }

    handleLike = (movie) => {
        const movies = [...this.state.moviesToShow];
        const index1 = movies.indexOf(movie);
        movies[index1] = { ...movies[index1] };
        movies[index1].isLiked = !movies[index1].isLiked;
        const index2 = this.state.movies.indexOf(movie);
        this.state.movies[index2].isLiked = !this.state.movies[index2].isLiked;
        this.setState({ moviesToShow: movies, movies });
    }

    handlePag = (page) => {

        this.setState({ pageNumber: page });
    }

    handleFilter = (genre) => {
        console.log(genre);
        const movies = [...this.state.movies];

        if (genre !== 'All Genre') {
            this.setState({ moviesToShow: movies.filter(m => m.genre.name === genre), pageNumber: 1, filteredGenre: genre });
        }

        else {
            this.setState({ moviesToShow: movies, filteredGenre: genre })
        }


    }

    renderNumber() {
        if (this.state.moviesToShow.length === 0) return <p>there are no movies in the database</p>

        return <p>showing {this.state.moviesToShow.length} movies in the database</p>
    }


    render() {

        return (<div className='row'>
            <div className='col-3'><GenreList filteredGenre={this.state.filteredGenre} onFilter={this.handleFilter} genres={this.state.genres} /></div>
            <div className='col'>
                <p>{this.renderNumber()} </p>
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