import React, { Component } from './node_modules/react';
import axios from './node_modules/axios';
import SignupC from '../../components/SignupC';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      weight: '',
      height: '',
      password: '',
      passwordConfirmation: '',
      message: '',
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.password === this.state.passwordConfirmation) {
      let userDetails = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        weight: this.state.weight,
        height: this.state.height,
        password: this.state.password
      };

      axios.post('userAuth/register', userDetails).then(result => {
        this.props.history.push('/login');
      });
    } else {
      this.handleClickOpen();
    }
  };

  render() {
    return (
      <div>
        <SignupC
          handleChange={this.handleChange.bind()}
          handleSubmit={this.handleSubmit}
          open={this.state.handleClickOpen}
        />
      </div>
    );
  }
}

export default Signup;
