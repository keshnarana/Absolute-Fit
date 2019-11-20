import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "5% 4% -3% 4%",
    backgroundColor: 'rgba(130, 130, 130, 0.5)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    width: '97%'
  },
  expansionPanelStyle: {
    margin: 11
  },
  center: {
    textAlign: 'center'
  },
  progressColorWeight: {
    backgroundColor: '#4d66f08a',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: "28px",
    marginTop: "19px",
    padding: "4%",
  },
  progressColorHeight: {
    backgroundColor: '#4d66f08a',
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: "28px",
    marginTop: "19px",
    padding: "4%",
  },
  buttonStyle: {
    marginTop: "4%"
  },
  info: {
    margin: "3% 8% 0% 8%"
  }
});

class WeightC extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} className={classes.center}>
            <Paper className={classes.root} elevation={1} id="weightCardTracker">
              <Typography align="center" variant="display1">
                Weight  Tracker
              </Typography>
              <Typography className={classes.info}>
                Enter your current weigth(kg) and height(Cm) below. Track as often as needed
              </Typography>
              <Paper className={classes.progressColorWeight}>
                <Typography align="center" variant="body2">Current Weight: {this.props.weight + " Kg"} </Typography>
                <Typography align="center" variant="body2">Current height: {this.props.height + "Cm"} </Typography>
              </Paper>

              <form
                className={classes.container}
                noValidate
                autoComplete="off"
                align="center"
              >
                <TextField
                  
                  id="addWeight"
                  label="Enter Weight"
                  fullWidth
                  // value={this.props.weight}
                  onChange={this.props.handleChange}
                  type="number"
                  className={classes.textField}
                  margin="normal"
                  value={this.props.updatedWeight}
                />
                <Button onClick={this.props.handleClick} variant="contained" className={classes.buttonStyle}>
                weight
              </Button>
                 <TextField
                  
                  id="addHeight"
                  label="Enter Height"
                  fullWidth
                  // value={this.props.weight}
                  onChange={this.props.handleChangeh}
                  type="number"
                  className={classes.textField}
                  margin="normal"
                  value={this.props.updatedHeight}
                />
                  <Button onClick={this.props.handleClickh} variant="contained" className={classes.buttonStyle}>
               height
              </Button>
              </form>
            
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root} elevation={1} id="weightCardGraph">
              <Typography variant="title" align="center">
                History (Last 30 Days)
              </Typography>
            
                   </Paper>
            <br></br>
            <Grid item xs={12} sm={6}>
            <Paper className={classes.root} elevation={1} id="bmi">
              <Typography variant="title" align="center">
               BMI
               <div className="form-group">
                    	
                    		<div className="col-sm-10">
                    		<div>
                <span>{this.props.result}</span>
                <p>{this.props.resultMsg}</p>
            </div>	</div>
                    	</div>
                    	<div className="form-group">
                    		<div className="col-sm-offset-2 col-sm-10">
                    			<Button type="button" variant="contained"  onClick={this.props.calculateBMI} className={classes.buttonStyle}>Calculate BMI</Button>
                    		</div>
                    	</div>
              </Typography>
             
            </Paper>
          </Grid>
          </Grid>
         
        </Grid>
      </div>
    );
  }
}

WeightC.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WeightC);
