
import NavBar from './components/navBar';
import MoviesSection from './components/moviesSection';
import Customers from './components/pages/Customers'
import NotFound from './components/pages/notFound'
import LoginForm from './components/forms/LoginForm';
import Rentals from './components/pages/Rentals';

import { Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';



class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>


          <Switch>

            <Route path='/login' component={LoginForm} />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/movies' component={MoviesSection} />
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
