
import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import Form from './form';
import { login } from '../../services/authService';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }


    doSubmit = async () => {
        try {
            const { data } = this.state;
            const { data: jwt } = await login(data.username, data.password)
            localStorage.setItem('token', jwt);
            const { state } = this.props.location;
            window.location = state ? state.from.pathname : '/';


        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors })
            }

        }

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

