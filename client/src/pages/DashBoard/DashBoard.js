import React, { Component } from 'react';
import DashBoardComponent from '../../components/DashBoard';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class DashBoard extends Component {
  state = {
    userId: localStorage.getItem('userId'),
    currentDayId: '',
    firstName: '',
    lastName: '',
    redirect: false,
    nutritionPoints: 0,
    exerciseMins: 0,
    foodcalories: 0,
    currentWeight: 0,
    currentHeight: 0,
    currentDate: ''
  };

  totalExerciseMinutes(arr) {
    let totalMinutes = 0;
    for (let i = 0; i < arr.length; i++) {
      totalMinutes = totalMinutes + arr[i].duration;
    }

    if (totalMinutes) {
      return totalMinutes;
    } else {
      return 0;
    }
  }

  totalFoodKals(arr) {
    let totalKals = 0;
    for (let i = 0; i < arr.length; i++) {
      totalKals = totalKals + arr[i].Kals;
    }

    if (totalKals) {
      return totalKals;
    } else {
      return 0;
    }
  }

  componentDidMount() {
    this.setState({ userId: localStorage.getItem('userId') });
    let todaysDate = moment().format('MM.DD.YYYY');

    let url = `/api/absoluteFit/user/${localStorage.getItem('userId')}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios.get(url).then(res => {
      let user = res.data;
      let mostRecentDate = moment()
        .add(-1, 'days')
        .format('MM.DD.YYYY');

      if (user.days.length) {
        mostRecentDate = moment(user.days[0].date).format('MM.DD.YYYY');
      }

      if (mostRecentDate === todaysDate) {
        this.setState({
          firstName: user.firstName,
          lastName: user.lastName,
          nutritionPoints: res.data.days[0].nutrition,
          exerciseMins: res.data.days[0].totalActivity,
          foodcalories: res.data.days[0].totalCalCount,
          currentDayId: res.data.days[0].id,
          currentWeight: res.data.days[0].weight,
          currentHeight: res.data.days[0].height
        });
      } else {
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          currentWeight: res.data.weight,
          currentHeight: res.data.height
        });

        axios
          .post('/api/absoluteFit/newDay', {
            userId: this.state.userId,
            weight: this.state.currentWeight,
            
            height: this.state.currentHeight,

            date: moment().format('MM.DD.YYYY')
          })
          .then(res => {
            this.setState({ currentDayId: res.data._id });
          });
      }
    });
  }

  renderRedirect = () => {
    if (!localStorage.getItem('jwtToken')) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <DashBoardComponent
        
          nutrition={this.state.nutritionPoints}
          weight={this.state.currentWeight}
          height={this.state.currentHeight}
          exercise={this.state.exerciseMins}
          food={this.state.foodcalories}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
        />
      </div>
    );
  }
}

export default DashBoard;