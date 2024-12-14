import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux'
import {setApplication} from '../utils/redux'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

function Review(props) {
    const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
            <Typography variant="h6" gutterBottom className={classes.title}>
                Review the details
            </Typography>
            <Typography gutterBottom>Name: {props.application.fullname}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Phone No.: {props.application.phone_no}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Email ID: {props.application.email_id}</Typography>
        </Grid>
      </Grid>
      
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Regestraion Type: {props.application.regestration_type}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Tickets: {props.application.no_tickets}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <img src={props.application.local_image_path} height="300px" width="300px" />  
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps  = state => {
    return{
        application: state.application
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        setApplication: (application) => dispatch(setApplication(application))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)
(Review);
