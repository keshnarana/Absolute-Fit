import React, { Component } from 'react';
import Weight from '../../components/Weight';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class WeightP extends Component {
  state = {
    redirect: false,
    weight: 0,
    height:0,
    updatedWeight: 0,
    updatedHeight: 0,
    currentDayId: '',
    quantities: [],
    dates: [],
    result: '',
    resultMsg: ''
  };

  componentDidMount() {
    // Sets the url to query
    let url = `/api/absoluteFit/getDaysWeight/${localStorage.getItem(
      'userId'
    )}`;

  

    // Sets the Authorization request header
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'jwtToken'
    );

    axios.get(url).then(res => {
      let data = res.data;
      
      let weightQuantities = [];
      let datesArr = [];

      for (let i = data.length - 1; i > -1; i--) {
        weightQuantities.push(data[i].weight);
        
        datesArr.push(moment(data[i].date).format('MM/DD/YYYY'));
      }

     
      this.setState({
        weight: data[0].weight,
        updatedWeight: data[0].weight,
        height: data[0].height,
        updatedHeight: data[0].height,
        currentDayId: data[0]._id,
        quantities: weightQuantities,
        dates: datesArr
      });
    });
  }

  handleChange(e) {
    this.setState({ updatedWeight: e.target.value });
   
  }
   // To calculate BMI
   calculateBMI(e) {
    let {updatedHeight, updatedWeight} = this.state;
    //height in cm, weight in kg
    //BMI=(w/(h*h))*10000
    let result = ( ( updatedWeight / ( updatedHeight * updatedHeight ) ) * 10000 ).toFixed(1);

    if ( result < 15 ) {
        this.setState({resultMsg: 'Very severely underweight'});
    } else if ( result > 15 && result <= 16 ) {
        this.setState({resultMsg: 'Severely underweight'});
    } else if ( result > 16 && result <= 18.5 ) {
        this.setState({resultMsg: 'Underweight'});
    } else if ( result > 18.5 && result <= 25 ) {
        this.setState({resultMsg: 'Normal (healthy weight)'});
    } else if ( result > 25 && result <= 30 ) {
        this.setState({resultMsg: 'Overweight'});
    } else if ( result > 30 && result <= 35 ) {
        this.setState({resultMsg: 'Moderately obese'});
    } else if ( result > 35 && result <= 40 ) {
        this.setState({resultMsg: 'Severely obese'});
    } else if ( result > 40 ) {
        this.setState({resultMsg: 'Very severely obese'});
    } else {
        this.setState({resultMsg: 'No input'});
    }

    this.setState({result: result});
}
  handleChangeh(e) {

    this.setState({ updatedHeight: e.target.value });
  }
  handleClickh() {
 
    this.setState({ height: this.state.updatedHeight }, () => {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'jwtToken'
      );
      axios
        .post('/api/absoluteFit/updateHeight', {
          height: this.state.height,
          id: this.state.currentDayId
        })
        .then(data => data)
        .catch(err => {
          console.log(err);
        });
    });
  }

  handleClick() {
    let arr = this.state.quantities;

    arr.splice(-1, 1);
    arr.push(this.state.updatedWeight);

    this.setState({ weight: this.state.updatedWeight }, () => {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'jwtToken'
      );
      axios
        .post('/api/absoluteFit/updateWeight', {
          weight: this.state.weight,
          id: this.state.currentDayId
        })
        .then(data => data)
        .catch(err => {
          console.log(err);
        });
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
        <Weight
          handleChange={this.handleChange.bind(this)}
          handleChangeh={this.handleChangeh.bind(this)}
          handleClick={this.handleClick.bind(this)}
          handleClickh={this.handleClickh.bind(this)}
          weight={this.state.weight}
          updatedWeight={this.state.updatedWeight}
          height={this.state.height}
          updatedHeight={this.state.updatedHeight}
          quantities={this.state.quantities}
          dates={this.state.dates}
          calculateBMI = {this.calculateBMI.bind(this)}
       result={this.state.result}
       resultMsg={this.state.resultMsg}
       />
      </div>
    );
  }
}

export default WeightP;
