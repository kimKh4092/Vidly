
import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Form from './form';
import { saveMovie } from '../../services/fakeMovieService';
import { Link } from 'react-router-dom';

class MovieForm extends Form {
    state = {
        data: {
            title: this.props.title,
            genre: this.props.genre,
            numbInStock: this.props.numbInStock,
            rate: this.props.rate

        },
        errors: {}
    }

    schema = {
        title: Joi.string().required().label('Title'),
        genre: Joi.string().required().label('Genre'),
        numbInStock: Joi.number().integer().required().min(0).max(100).label('Number In Stock'),
        rate: Joi.number().min(0).max(10).required().label('Rate'),
    }


    doSubmit = (data, id) => {
        this.props.history.push('/movies');
        const movie = { ...data }
        this.props.onSave(movie, id);




    }

    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name='title'
                        value={this.state.data.title}
                        label='Title'
                        onChange={this.handleChange}
                        type='text'
                        error={this.state.errors.title} />


                    <label >Genre</label>
                    <div className="input-group mb-3">
                        <select onChange={this.handleChange} className="custom-select"
                            id="inputGroupSelect01"
                            value={this.state.data.genre}
                            name='genre'>

                            <option >{this.state.data.genre}</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Thriller">Thriller</option>

                        </select>
                    </div>


                    <Input name='numbInStock'
                        type='text'
                        value={this.state.data.numbInStock}
                        label='Number In Stock'
                        onChange={this.handleChange}
                        error={this.state.errors.numbInStock} />
                    <Input name='rate'
                        type='text'
                        value={this.state.data.rate}
                        label='Rate'
                        onChange={this.handleChange}
                        error={this.state.errors.rate} />


                    <button disabled={this.validate()}
                        className='btn btn-primary'>Save
                    </button>
                </form>

            </div >

        );
    }
}

export default MovieForm;

