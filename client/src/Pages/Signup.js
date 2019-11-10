import React, { Component } from 'react';
import axios from 'axios';
import Signup from '../components/Signup';

class Signup extends Component {
    constructor() {
      super();
      this.state = { 
          firstName: '',
          lastName: '',
          userName: '',
          weight: '',
          password: '',
          passwordConfirmation: '',
          message: '',
          open: false,
     };
    }



} // signup comp