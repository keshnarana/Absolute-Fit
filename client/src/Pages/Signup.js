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

    handleClickOpen = () => {
      this.setState ({ open: true});
    };

    handleClose = () => {
        this.setState ({ open: false });
    };

    handleSubmit = e => {
        this.setState ({ [e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDeafualt();

        if (this.state.password === this.state.passwordConfrimation) {
            let userDetails = {
               firstName: this.state.firstName,
               lastName: this.state.lastName,
               userName: this.state.userName,
               weight: this.state.weight,
               password: this.state.password
            } ;  
            

         axios.post('/auth/register', userDetails).then(result => {
               this.props.history.push ('/login');

         });

        } else {
           this.handleClickOpen();

        }
            };

       render() {
          retun (
             <div>
               <SignupCompent
                handleChange={this.handleChange.bind()}
                handleSubmit={this.handleSubmit}
                open={this.state.handleClickOpen}
               />
             </div>


         );

       }


    } // signup comp


export default Signup;