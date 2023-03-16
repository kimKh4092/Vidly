import React, { Component } from 'react';



class MovieForm extends Component {
    handleSave = () => {
        this.props.history.replace('/movies')
    }

    render() {
        return (
            <div className='content m-4'>
                <h2 >Movie Form {this.props.movieId}</h2>
                <button onClick={this.handleSave} className='btn btn-primary'>save</button>

            </div>
        );
    }
}



export default MovieForm;