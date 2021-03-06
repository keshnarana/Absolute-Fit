import React, { Component } from 'react';
import ExerciseC from '../../components/ExerciseC';
import { Redirect } from 'react-router-dom';

import axios from "axios"
import moment from 'moment-timezone';

class Exercise extends Component {
  state = {
    redirect: false,
    currentDayId: "",
    newExercise: "",
    newDuration: 0,
    dailyTotal: 0,
    todaysActivity: [],
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

      let exerciseQuantities = []
      let datesArr = []

      for (let i = data.length - 1; i > -1; i --) {
        exerciseQuantities.push(data[i].totalActivity)
        datesArr.push(moment(data[i].date).tz("America/New_York").format("MM/DD/YYYY"))
      }

      this.setState({
        currentDayId: data[0]._id,
        dailyTotal: data[0].totalActivity,
        todaysActivity: data[0].exercises,
        quantities: exerciseQuantities,
        dates: datesArr
      })
    })
    .catch(err => {console.log(err)})

  }

  handleDurationChange(e) {
    this.setState({ newDuration: parseInt(e.target.value,10) }, () => {
      console.log(this.state.newDuration)
    });
  }

  handleExerciseChange(e) {
    this.setState({ newExercise: e.target.value }, () => {
      console.log(this.state.newExercise)
    })
  }

  addExercise() {
    let newActivities = this.state.todaysActivity
    newActivities.push({exercise: this.state.newExercise, duration: this.state.newDuration})
    this.setState({
      dailyTotal: this.state.dailyTotal + this.state.newDuration,
      todaysActivity: newActivities
    }, () => {

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.post('/api/absoluteFit/newExercise', {
        exercise: this.state.newExercise,
        duration: this.state.newDuration,
        totalActivity: this.state.dailyTotal,
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
        <ExerciseC
          dates={this.state.dates}
          quantities={this.state.quantities}
          totalActivity={this.state.dailyTotal}
          todaysActivities={this.state.todaysActivity}
          addExercise={this.addExercise.bind(this)}
          handleExerciseChange={this.handleExerciseChange.bind(this)}
          handleDurationChange={this.handleDurationChange.bind(this)}
          activity={this.state.newExercise}
        />
      </div>
    );
  }
}

export default Exercise;
