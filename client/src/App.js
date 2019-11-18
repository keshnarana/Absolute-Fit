import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nutrition from './pages/NutritionPage';
import Exercise from './pages/ExcersisePage';


import './App.css';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Switch>
      <Route exact path="/" component={DashBoard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/nutrition" component={Nutrition} />
        <Route exact path="/exercise" component={Exercise} />
     
      </Switch>
    </div>
  </Router>
);

export default App;
