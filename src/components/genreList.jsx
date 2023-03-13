import React, { Component } from 'react';

class genreList extends Component {

    render() {
        return (
            <ul className="list-group m-2">
                <li
                    style={{ color: 'black' }}
                    className="list-group-item list-group-item-action"
                    onClick={() => this.props.onFilter('All Genre')}>All Genres</li>


                {
                    this.props.genres.map(genre =>
                        <li key={genre._id}
                            style={{ color: 'black' }}
                            className="list-group-item list-group-item-action"
                            onClick={() => this.props.onFilter(genre.name)}>{genre.name}</li>

                    )
                }
            </ul>

        );
    }
}

export default genreList;