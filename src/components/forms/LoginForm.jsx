//get access to a dom element
//add refrence to element

//controlled element

//validation
//validate upon submit form
import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
    state = {
        account: { username: '', password: '' },
        errors: {

        }

    }

    username = React.createRef();

    // componentDidMount() {
    //     this.username.current.focus()
    // } use autoFocus instead

    validate = () => {
        const errors = {};
        if (this.state.account.username.trim() === '') {
            errors.username = 'Username is required'
        }

        if (this.state.account.password.trim() === '') {
            errors.password = 'Password is required'
        }

        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        console.log(errors);
        this.setState({ errors: errors || {} })
        if (errors) return;

        // const username = this.username.current.value;
        // console.log(username)
    };

    validateProperty = input => {
        if (input.name === 'username') {
            if (input.value.trim() === '') return 'Username is required.'

        }
        if (input.name === 'password') {
            if (input.value.trim() === '') return 'Password is required.'

        }
    }

    handleChange = e => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(e.currentTarget)
        if (errorMessage) {
            errors[e.currentTarget.name] = errorMessage
        }
        else delete errors[e.currentTarget.name];


        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account, errors })

    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name='username'
                        value={this.state.account.username}
                        label='Username'
                        onChange={this.handleChange}
                        error={this.state.errors.username} />
                    <Input name='password'
                        value={this.state.account.password}
                        label='Password'
                        onChange={this.handleChange}
                        error={this.state.errors.password} />


                    <button className='btn btn-primary'>Login</button>
                </form>

            </div>

        );
    }
}

export default LoginForm;

