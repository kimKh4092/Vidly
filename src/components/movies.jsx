import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import _ from 'lodash'
import Pag from './pagination';
import GenreList from './genreList';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import { getGenres } from '../services/genreService';

class Movies extends Component {
    state = {
        movies: this.props.movies,
        moviesToShow: this.props.movies,
        numbPerPage: 4,
        pageNumber: 1,
        genres: [],
        filteredGenre: '',
        sortedcolumn: { path: 'title', order: 'asc' },
        filterElement: ''
    }

    async componentDidMount() {
        const { data: genres } = await getGenres()
        const { data: movies } = await getMovies()
        this.setState({ genres, movies, moviesToShow: movies })
    }

    handleDelete = (id) => {
        let movies = this.state.moviesToShow.filter(m => m._id !== id);
        const allMovies = [...this.state.movies].filter(m => m._id !== id)
        this.setState({ moviesToShow: movies, movies: allMovies });
        this.props.onDelete(id);
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

    handleFilter = (filterElement) => {
        const movies = [...this.state.movies];

        if (typeof (filterElement) === 'object') {
            const title = filterElement.target.value;
            const filtered = movies.filter(m => m.title.toUpperCase().includes(title.toUpperCase()))
            this.setState({ moviesToShow: filtered, filterElement: title, filteredGenre: '', pageNumber: 1 })

        }

        if (typeof (filterElement) === 'string') {
            const genre = filterElement;
            if (genre !== 'All Genre') {
                this.setState({ moviesToShow: movies.filter(m => m.genre.name === genre), pageNumber: 1, filteredGenre: genre, filterElement: '' });
            }

            else {
                this.setState({ moviesToShow: movies, filteredGenre: genre, filterElement: '' })
            }



        }

    }


    handleSort = (sortedcolumn) => {

        this.setState({ sortedcolumn })
    }

    renderNumber() {
        if (this.state.moviesToShow.length === 0) return <p>there are no movies in the database</p>

        return <p>showing {this.state.moviesToShow.length} movies in the database</p>
    }

    showMovies = () => {
        const movies = this.state.moviesToShow;
        const sorted = _.orderBy(movies, [this.state.sortedcolumn.path], [this.state.sortedcolumn.order])
        let index = this.state.numbPerPage * (this.state.pageNumber - 1);
        let moviesToShow = sorted.slice(index, index + this.state.numbPerPage)
        return moviesToShow

    }



    render() {

        return (

            <div className='row'>
                <div className='col-3'><GenreList filteredGenre={this.state.filteredGenre} onFilter={this.handleFilter} genres={this.state.genres} /></div>
                <div className='col'>
                    <button className='btn btn-primary m-2 '>
                        <Link to='/movies/new' style={{ color: 'white', textDecoration: 'none' }}>New Movie</Link></button>

                    <p className='m-2'>{this.renderNumber()} </p>
                    <div className='form-group'>
                        <input className='form-control m-2 mb-3'
                            placeholder='Search...'
                            onChange={this.handleFilter}
                            value={this.state.filterElement}

                        /></div>


                    <MoviesTable moviesToShow={this.showMovies()}
                        numbPerPage={this.state.numbPerPage}
                        pageNumber={this.state.pageNumber}
                        sortedcolumn={this.state.sortedcolumn}
                        handleLike={this.handleLike}
                        handleDelete={this.handleDelete}
                        handleSort={this.handleSort} />


                    <Pag numbOfPages={(this.state.moviesToShow.length / this.state.numbPerPage) + 1}
                        onClick={this.handlePag}
                        pageNumber={this.state.pageNumber} />
                </div>


            </div>

        );

    }
}

export default Movies;