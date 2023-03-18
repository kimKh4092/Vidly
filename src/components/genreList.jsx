import React, { Component } from 'react';

class genreList extends Component {



    render() {
        let class1 = "list-group-item list-group-item-action";
        let class2 = "list-group-item list-group-item-action active";

        return (
            <ul className="list-group m-2">
                <li

                    className={(this.props.filteredGenre === 'All Genre') ? class2 : class1}
                    onClick={() => this.props.onFilter('All Genre')}>All Genres</li>


                {
                    this.props.genres.map(genre =>
                        <li key={genre._id}

                            className={(this.props.filteredGenre === genre.name) ? class2 : class1}
                            onClick={() => this.props.onFilter(genre.name)}>{genre.name}</li>

                    )
                }
            </ul>

        );
    }
}

export default genreList;