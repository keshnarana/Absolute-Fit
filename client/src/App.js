import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NutritionPage from './pages/NutritionPage';
import ExercisePage from './pages/ExcersisePage';
import Bmi from './pages/Bmi';


import './App.css';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Switch>
      <Route exact path="/" component={DashBoard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/exercise" component={ExercisePage} />
        <Route exact path="/weight" component={Bmi} />
          </Switch>
    </div>
  </Router>
);

export default App;
