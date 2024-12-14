import React, { useState } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import querystring from 'querystring'

import UserDefaultLayout from '../../layouts/UserDefaultLayout';
import { Paper, Typography, StepButton, Stepper, Button, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserDetails from '../../components/UserDetails';
import Review from '../../components/Review'; 
import ErrorDialog from '../../components/ErrorDialog';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 700,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    }
  }));
function UserApplication(props) {
    const classes = useStyles();

    const steps = ['Your Details', 'Review your details'];

    const [error, setError] = useState(false);
    const [diaMessage, setDiaMessage] = useState("");
    
    const [activeStep, setActiveStep] = useState(0)

    const [regNo, setRegNo] = useState("")

    const getStepContent = (step) =>{
        switch (step) {
            case 0:
              return <UserDetails />;
            case 1:
              return <Review />;
            default:
              throw new Error('Unknown step');
         }
    };

    const submitApplication =()=>{
      // setError(false);
      if(props.application.fullname === undefined || props.application.phone_no === undefined || props.application.email_id === undefined || props.application.local_image_path === undefined || props.application.regestration_type === undefined || props.application.no_tickets === undefined){
        setError(true);
        setDiaMessage("Please enter the required fields");
      }
        
      else if(props.application.no_tickets <=0){
        setError(true);
        setDiaMessage( "Please enter the valid number of tickets" );
      }
      else{
        axios.post('http://localhost:8080/user/apply',querystring.stringify(props.application))
        .then((res)=>{
          if(res.status === 200)
            setActiveStep(activeStep+1);
            setRegNo(res.data);
        })
        .catch((error)=>{
          alert('Internal server error');
        })
        console.log("error found");
        
      }
    };
    const handleNext = (event) => {
      
        if (activeStep === 1) {
            submitApplication();
        }
        else {
            setActiveStep(activeStep + 1);
        }
      };
      const handleBack = () => {
        setActiveStep(activeStep - 1);
      };
    return (
        <React.Fragment>
            <UserDefaultLayout/>
            {error ?
              <ErrorDialog message={diaMessage} /> : ""}
            <div className={classes.layout}>
            <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Your Application is submitted.
                </Typography>
                  <Typography variant="subtitle1">
                    Your regestration is done successfully.
                    Your Application number is: {regNo}
                </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {
                      getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Apply' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state =>{
  return{
    application: state.application
  }
}
export default connect(
  mapStateToProps
) 
(UserApplication);