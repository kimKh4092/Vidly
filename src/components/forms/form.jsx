import React, { Component } from 'react';
import Joi from 'joi-browser'

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const result = Joi.validate(this.state.data, this.schema, { abortEarly: false })


        if (!result.error) return null;
        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;

    }

    validateProperty = input => {
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const { error } = Joi.validate(obj, schema);
        if (!error) return null;
        return error.details[0].message;

    }

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} })
        if (errors) return;
        this.doSubmit();

        // this.doSubmit(this.state.data, this.props.movieId);

    };

    handleChange = e => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(e.currentTarget)
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage
        }
        else delete errors[e.currentTarget.name];


        const data = { ...this.state.data };
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ data, errors })


    }

}

export default Form;