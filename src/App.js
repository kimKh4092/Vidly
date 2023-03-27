
import NavBar from './components/navBar';
import MoviesSection from './components/moviesSection';
import Customers from './components/pages/Customers'
import NotFound from './components/pages/notFound'
import LoginForm from './components/forms/LoginForm';
import Rentals from './components/pages/Rentals';
import RegisterForm from './components/forms/registerForm';
import Logout from './components/logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import jwtDecode from 'jwt-decode';


class App extends Component {
  state = {

  };
  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({ user });

    } catch (ex) {

    }


  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <main className='container'>
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/movies' render={props => <MoviesSection
              {...props}
              user={this.state.user} />} />
            <Redirect from='/' exact to='movies' />
            <Route path='/not-found' component={NotFound} />
            <Redirect to='/not-found' />
          </Switch>

        </main>
      </React.Fragment>





    );
  }
}

export default App;
