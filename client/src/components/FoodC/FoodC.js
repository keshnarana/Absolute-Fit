import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';





const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "5% 4% -1% 4%",
    backgroundColor: 'rgba(130, 130, 130, 0.5)',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
    // width: 200
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  expansionPanelStyle: {
    margin: 11
  },
  rootList: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // position: 'relative',
    // overflow: 'auto',
    maxHeight: 300
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  header: {
    marginBottom: "-4%"
  },
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  submit: {
    textAlign: 'center'
  },
  progressColor: {
    backgroundColor: '#825eb9b5',
    marginLeft: '19%',
    marginRight: '19%',
    marginBottom: '28px',
    marginTop: '19px',
    padding: '4px'
  },
  info: {
    margin: "3% 2% 0% 2%"
  },
  graphPaper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "5% 4% 16% 4%"
  }
});

class FoodC extends React.Component {
  renderTableRows(arr) {
    return (
      arr.map((element,i) => {
        return (
          <TableRow key={i}>
            <TableCell >{element.food}</TableCell>
            <TableCell >{element.calories} Calories</TableCell>
          </TableRow>
        )
      })
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.root} elevation={1} >
              <Typography
                className={classes.header}
                variant="display1"
                align="center"
              >
                Food Tracker
              </Typography>
              <Typography className={classes.info} align="center">
                Select a Food Items below and choose the calories.
                
              </Typography>

              <Paper className={classes.progressColor}>
                <Typography align="center" variant="body2">
                  Current Progress: {this.props.totalActivity} cals
                </Typography>
              </Paper>

            

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <form
                    align="center"
                    className={classes.formRoot}
                    autoComplete="off"
                  >
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel htmlFor="Food-Count">FoodCount</InputLabel>
                      <Select
                        value={this.props.food}
                        onChange={this.props.handleFoodItems}
                        inputProps={{ name: 'Food', id: 'Food-Count' }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Oatmeal'}>Oatmeal</MenuItem>
                        <MenuItem value={'Bread'}>Bread</MenuItem>
                        <MenuItem value={'Apple'}>Apple</MenuItem>
                        <MenuItem value={'ChickenSalad'}>ChickenSalad</MenuItem>
                        <MenuItem value={'Banana'}>Banana</MenuItem>
                        <MenuItem value={'Juice'}>Juice</MenuItem>
                        <MenuItem value={'FriedRice'}>
                        FriedRice
                        </MenuItem>
                        <MenuItem value={'cereal'}>Boxing</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                      </Select>
                      <FormHelperText>
                        Select the Food and calories
                      </FormHelperText>
                    </FormControl>
                  </form>
                </Grid>
               
                <Grid item xs={12}>
                  <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="addCalories"
                      label="Enter Calories"
                      value={this.props.calories}
                      onChange={this.props.handleCalorieCount}
                      type="number"
                      className={classes.textField}
                      margin="normal"
                      name="calories"
                      fullWidth
                    />
                  </form>
                </Grid>
                <Grid className={classes.submit} item xs={12}>
                  <Button onClick={this.props.addFoodItem} variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
             </Paper>
          </Grid>



          <Grid item xs={12} md={6}>
            <Paper className={classes.root} elevation={1} id="FoodCard">
              <Typography variant="display1" className={classes.heading} align="center">
                Today
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell>Calories</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.renderTableRows(this.props.todaysActivities)}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
         
        </Grid>
      </div>
    );
  }
}
FoodC.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FoodC); 
