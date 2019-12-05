import React, { Component } from 'react';
import FoodC from '../../components/FoodC';
import { Redirect } from 'react-router-dom';

import moment from 'moment-timezone';
import axios from "axios"

class Food extends Component {
  state = {
    redirect: false,
    currentDayId: "",
    newFood: "",
    newCalories: 0,
    dailyTotal: 0,
    todaysCalCount: [],
    quantities: [],
    dates: [],
  male:0,
  female:0,
    rM:0,
    rLow:0,
    rHigh:0,
    uHeight:0,
    uWeight:0,
    uAge:0,
    gender:"",
    
    bmr:0
  };

  componentDidMount() {
    // Sets the url to query
    let url = `/api/absoluteFit/getDays/${localStorage.getItem('userId')}`

    // Sets the Authorization request header
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get(url)
    .then(res => {
      let data = res.data
      console.log(data)

      let foodQuantities = []
      let datesArr = []

      for (let i = data.length - 1; i > -1; i --) {
        foodQuantities.push(data[i].totalCalCount)
        datesArr.push(moment(data[i].date).tz("America/New_York").format("MM/DD/YYYY"))
      }
     // console.log(data[0].foods, "look food")
      this.setState({
        currentDayId: data[0]._id,
        dailyTotal: data[0].totalCalCount,
        todaysCalCount: data[0].food,
        quantities: foodQuantities,
        dates: datesArr
      })
    })
    .catch(err => {console.log(err)})
   // console.log(this.state.todaysCalCount, "look")
  }
 
  handleChangeh(e) {

    this.setState({[e.target.id]: e.target.value});
    
  }
 
   // To calculate BMI
   calculateBMR(e) {
    let {uHeight, uWeight, uAge, gender} = this.state;
    //height in cm, weight in kg
    //BMI=(w/(h*h))*10000
    
let male = ( (10 * uWeight + (6.25 *  uHeight))- (5 * uAge) + 5)
let female = ((10 * uWeight + (6.25 * uHeight))-(5 * uAge)-161)

    if ( gender === 'male' ) {
      let rM = (male * 1.55).toFixed(1);
      let rLow= (male * 1.2).toFixed(1);
      let rHigh= (male * 1.725).toFixed(1);
      this.setState({bmr: "BMR "+ male})
      this.setState({rLow: rLow +" calories per day. If you are sedentary (little or no exercise)"});
      this.setState({rM: rM +" calories per day. If you are moderatetely active (moderate exercise/sports 3-5 days/week)"});
      this.setState({rHigh: rHigh +" calories per day. If you are very active (hard exercise/sports 6-7 days a week)"});
    } else if ( gender === 'female') {
      let rM =  (female * 1.55).toFixed(1);
      let rLow= (female * 1.2).toFixed(1);
      let rHigh= (female *1.725).toFixed(1);
      this.setState({bmr: "BMR "+ female})
      this.setState({rLow: rLow +" calories per day. If you are sedentary (little or no exercise) "});
      this.setState({rM: rM +" calories per day. If you are moderatetely active (moderate exercise/sports 3-5 days/week)"});
      this.setState({rHigh: rHigh +" calories per day. If you are very active (hard exercise/sports 6-7 days a week)"});
    } 
    else {
      this.setState({rM: 'No input'});
      this.setState({rLow: 'No input'});
      this.setState({rHigh: 'No input'});
  }
}
 

  handleCaloriesCount(e) {
  //  console.log(e.target.value)
    this.setState({ newCalories: parseInt(e.target.value )}, () => {
      console.log(this.state.newCalories)
    });
  }

  handleFoodItems(e) {
    this.setState({newFood: e.target.value}, () => {
      console.log(this.state.newFood)
    })
  }

  addFoodItems() {
    let newCals = this.state.todaysCalCount
    newCals.push({food: this.state.newFood, calories: this.state.newCalories})
    this.setState({
      dailyTotal: this.state.dailyTotal + this.state.newCalories,
      todaysCalCount: newCals
    }, () => {
     
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post('/api/absoluteFit/newFood', {
        food: this.state.newFood,
        calories: this.state.newCalories,
        totalCalCount: this.state.dailyTotal,
        currentDayId: this.state.currentDayId
      })
      .then(data => console.log(data))
      .catch(err => {
        console.log(err)
      })
    })
  }


  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />
    }
  };

  render() {
    //console.log(this.state.todaysCalCount, "look here")
    return (
      <div>
        {this.renderRedirect()}
        <FoodC
          dates={this.state.dates}
          quantities={this.state.quantities}
          totalCalCount={this.state.dailyTotal}
          todaysCalCount={this.state.todaysCalCount}
          addFoodItems={this.addFoodItems.bind(this)}
          handleFoodItems={this.handleFoodItems.bind(this)}
          handleCaloriesCount={this.handleCaloriesCount.bind(this)}
          food={this.state.newFood}
          handleChangeh={this.handleChangeh.bind(this)}
          calculateBMR = {this.calculateBMR.bind(this)}
          bmr={this.state.bmr}
          rM={this.state.rM}
          rLow={this.state.rLow}
          rHigh={this.state.rHigh}
          uWeight={this.state.uWeight}
          uHeight={this.state.uHeight}
          uAge={this.state.uAge}
          gender={this.state.gender}
        />
      </div>
    );
  }
}

export default Food;
