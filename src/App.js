
import './App.css';
import NavBar from './components/navBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Rentals from './components/Rentals';
import React, { Component } from 'react';
import MoviesSection from './components/moviesSection';
import Customers from './components/Customers'
import NotFound from './components/notFound'


class App extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <div className='content'>
          <Switch>


            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/movies' component={MoviesSection} />
            <Redirect from='/' exact to='movies' />
            <Route path='/not-found' component={NotFound} />
            <Redirect to='/not-found' />


          </Switch>

        </div>

      </div>

    );
  }
}

export default App;
