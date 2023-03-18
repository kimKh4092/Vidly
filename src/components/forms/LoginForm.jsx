
import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Form from './form';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = () => {
        console.log('submitted')
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name='username'
                        value={this.state.data.username}
                        label='Username'
                        onChange={this.handleChange}
                        type='text'
                        error={this.state.errors.username} />
                    <Input name='password'
                        type='password'
                        value={this.state.data.password}
                        label='Password'
                        onChange={this.handleChange}
                        error={this.state.errors.password} />


                    <button disabled={this.validate()}
                        className='btn btn-primary'>Login</button>
                </form>

            </div>

        );
    }
}

export default LoginForm;

