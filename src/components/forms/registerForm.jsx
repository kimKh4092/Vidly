import React, { Component } from 'react';
import Form from './form';
import Input from './input';
import Joi from 'joi-browser'

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }


    schema = {
        username: Joi.string().required().email().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name')
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
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
                    <Input name='name'
                        type='text'
                        value={this.state.data.name}
                        label='Name'
                        onChange={this.handleChange}
                        error={this.state.errors.name} />


                    <button disabled={this.validate()}
                        className='btn btn-primary'>Register</button>
                </form>

            </div>



        );
    }
}

export default RegisterForm;