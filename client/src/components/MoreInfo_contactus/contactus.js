import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'rgba(10,45,89, 0.4)',
    width: '50%',
    height: 'auto',
    margin: 'auto',
    marginTop: '4%',
  },
  button: {
    
    marginTop: '20px',
 
    backgroundColor: 'orange',
  },
  header: {
    margin: "2% 2% 8% 2%",
    fontSize: "261%"
  },
  typeSpace: {
    padding: "2% 1% 5% 1%"

  }

});



class ContactForm extends React.Component{
  
  handleSubmit(e){
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      axios({
          method: "POST", 
          url:"/send", 
          data: {
              name: name,   
              email: email,  
              message: message
          }
      }).then((response)=>{
          if (response.data.msg === 'success'){
              alert("Message Sent."); 
              this.resetForm()
          }else if(response.data.msg === 'fail'){
              alert("Message failed to send.")
          }
      })
  }

  resetForm(){
      document.getElementById('contact-form').reset();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
              <Paper className={classes.root} align="center">
       
          <Typography variant="body2" className={classes.typeSpace} align="center">

           <h2>email us</h2>
           <p> Note: We don’t offer phone support out of full dedication to our other help channels. 
           Online support allows us to send and receive emails,
           helping us answer questions and figure out issues more efficiently.  </p>

       
           <p>              
             we’ll email you back as soon as we can </p>
           
           

          <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                  <div className="form-group">
                     
                      <TextField name="Name" label="Name" type="text"  className={classes.textField} id="name" />
                  </div>
                  <div className="form-group">
                       <TextField name="Email" label="Email"type="email"  className={classes.textField} id="email" aria-describedby="emailHelp" />
                  </div>
                  <div className="form-group">
                    
                      <TextField name="message" label="message"   fullWidth  className={classes.textField} rows="5" id="message"/>
                  </div>
                  <Button type="submit"  size="large"
                variant="contained"
                color="primary"
                className={classes.button}>Submit</Button>
              </form>

          </Typography>
        </Paper>
      </div>
    );
  }
}




ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactForm);