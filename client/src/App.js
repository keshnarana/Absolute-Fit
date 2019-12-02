import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NutritionPage from './pages/NutritionPage';
import ExcersisePage from './pages/ExcersisePage';
//import FoodPage from './pages/FoodPage';
import Bmi from './pages/Bmi';
import MoreInfoPage from './components/MoreInfo_contactus';


import './App.css';

const App = () => {
  return(
  <Router>
    <div>
      <NavBar />
      <Switch>
      <Route exact path="/" component={DashBoard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/nutrition" component={NutritionPage} />
        <Route exact path="/exercise" component={ExcersisePage} />
        {/* <Route exact path="/food" component={FoodPage}/> */}
        <Route exact path="/weight" component={Bmi} />
        <Route exact path="/Info" component={MoreInfoPage}/>
          </Switch>
    </div>
  </Router>
  );
  }

export default App;
