import React, { Component } from 'react';
import FoodC from '../../components/FoodC';
import { Redirect } from 'react-router-dom';
import moment from "moment"
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
    dates: []
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
        datesArr.push(moment(data[i].date).format("MM/DD/YYYY"))
      }

      this.setState({
        currentDayId: data[0]._id,
        dailyTotal: data[0].totalCalCount,
        todaysCalCount: data[0].food,
        quantities: foodQuantities,
        dates: datesArr
      })
    })
    .catch(err => {console.log(err)})

  }

  handleCalorieCount(e) {
    this.setState({ newCalories: parseInt(e.target.value,10) }, () => {
      console.log(this.state.newCalories)
    });
  }

  handleFoodItems(e) {
    this.setState({newFood: e.target.value }, () => {
      console.log(this.state.newFood)
    })
  }

  addFoodItems() {
    let newCals = this.state.todaysCalCount
    newCals.push({food: this.state.newFood, duration: this.state.newCalories})
    this.setState({
      dailyTotal: this.state.dailyTotal + this.state.newCalories,
      todaysCalCount: newCals
    }, () => {

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post('/api/absoluteFte.newFood', {
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
    return (
      <div>
        {this.renderRedirect()}
        <FoodC
          dates={this.state.dates}
          quantities={this.state.quantities}
          totalCalCount={this.state.dailyTotal}
          todaysActivities={this.state.todaysCalCount}
          addFoodItems={this.addFoodItems.bind(this)}
          handleFoodItems={this.handleFoodItems.bind(this)}
          handleCalorieCount={this.handleCalorieCount.bind(this)}
          activity={this.state.newFood}
        />
      </div>
    );
  }
}

export default Food;
