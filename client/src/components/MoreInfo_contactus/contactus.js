import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';




const styles = {
  root: {
    margin: "5%",
    padding: "1% 5% 4% 6%",
    marginTop: "10%"
  },
  header: {
    margin: "2% 2% 8% 2%",
    fontSize: "261%"
  },
  typeSpace: {
    padding: "2% 1% 5% 1%"

  }

};

class Info extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
              <Paper className={classes.root} align="center">
       
          <Typography variant="body2" className={classes.typeSpace} align="center">
           contact map and email
          </Typography>
        </Paper>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Info);