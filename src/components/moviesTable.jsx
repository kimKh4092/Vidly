import React, { Component } from 'react';
import Like from './likeComponent';

class MoviesTable extends Component {

    raiseSort = path => {
        const sortedcolumn = { ...this.props.sortedcolumn };
        if (sortedcolumn.path === path) {
            sortedcolumn.order = sortedcolumn.order === "asc" ? "desc" : "asc";
        }
        else {
            sortedcolumn.path = path;
            sortedcolumn.order = "asc";
        }

        this.props.handleSort(sortedcolumn);
    }

    renderSortIcon = (path) => {
        if (this.props.sortedcolumn.path !== path) return null;
        if (this.props.sortedcolumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }

    render() {
        return (
            <table className='table m-4'>
                <thead>
                    <tr>
                        <th className='clickable' onClick={() => this.raiseSort("title")}>Title {this.renderSortIcon("title")}</th>
                        <th className='clickable' onClick={() => this.raiseSort("genre.name")}>Genre {this.renderSortIcon("genre.name")}</th>
                        <th className='clickable' onClick={() => this.raiseSort("numberInStock")}>Stock {this.renderSortIcon("numberInStock")}</th>
                        <th className='clickable' onClick={() => this.raiseSort("dailyRentalRate")}>Rate {this.renderSortIcon("dailyRentalRate")}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.moviesToShow.map(movie =>
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like getLiked={() => this.props.handleLike(movie)} liked={movie.isLiked} /></td>
                            <td><button
                                onClick={() => this.props.handleDelete(movie._id)}
                                className='btn btn-danger btn-sm m-2'>Delete</button></td>


                        </tr >


                    )}
                </tbody>
            </table>

        );
    }
}

export default MoviesTable;