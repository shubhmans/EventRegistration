import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import {setApplication} from '../utils/redux';
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  FormLabel,
  InputLabel,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Divider
} from "@material-ui/core";
import axios from "axios";
import ErrorDialog from './ErrorDialog'
const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  label: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(2),
    color: "#263238"
  }
}));
const UserDetails = (props) => {
  const [inputs, setInputs] = useState(props.application);
  const [reg_type, setRegType] = useState("");
  const [image,setImage] =useState("");

  const [error, setError] = useState(false);
  const [diaMessage, setDiaMessage] = useState("");
  
  const handleChange = event => {
    setRegType(event.target.value);
  };
  const uploadImage = () => {

    if (!image) {
      setDiaMessage( 'Please select image.' );
      setError(true);
    }
   
    if (!image.name.match(/\.(jpeg|png)$/)) {
      setDiaMessage( 'Please select valid image.' );
      setError(true);
    }
    else{
      const data=new FormData();
      data.append("image", image);
      axios.post('http://localhost:8080/user/fileupload',data)
      .then(response =>{
        setInputs({...inputs, 'id_image': response.data.imageUrl});
      })
      .catch(error =>{
        console.log(error);
      })
    }
    
  };

  const selectImage = event => {
    setInputs({...inputs, 'local_image_path': URL.createObjectURL(event.target.files[0])});
    setImage(event.target.files[0]);
  };
  const classes = useStyles();
  const handleInputs = event => {
    event.persist();
    if(event.target.name === 'regestration_type'){
      if(event.target.value === 'self')
        inputs.no_tickets =1;
      else
        inputs.no_tickets =2;
    }
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    props.setApplication(inputs);

  }, [inputs])
  return (
    <React.Fragment>
      {error ?
              <ErrorDialog message={diaMessage} /> : ""}
      <Typography variant="h6">Personal Details</Typography>
      
      <Grid container spacing={3}>
        <Grid item md={12}>
          <TextField
            required
            id="fullname"
            name="fullname"
            label="Full Name"
            onChange={handleInputs}
            value={inputs.fullname || ""}
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone_no"
            name="phone_no"
            label="Phone No."
            onChange={handleInputs}
            value={inputs.phone_no || ""}
            fullWidth
            autoComplete="phone-no"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="email"
            id="email_id"
            name="email_id"
            label="Email ID."
            onChange={handleInputs}
            value={inputs.email_id || ""}
            fullWidth
            autoComplete="phone-no"
          />
        </Grid>
        <Grid item xs={12} spacing={3}>
        <Grid container>
          <FormLabel component="label" className={classes.label}>
            Upload ID proof
          </FormLabel>
            <input
              name="id_image"
              id="contained-button-file"
              onChange={selectImage}
              type="file"
              className="form-control"
            />
          <Button
            onClick={uploadImage}
            color="primary"
            variant="contained"
            className={classes.button}
            size="small"
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      </Grid>
      <Divider className={classes.selectEmpty} />
      <Typography variant="h6" gutterBottom className={classes.selectEmpty}>
        Regestration Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Regestration Type
            </InputLabel>
            <Select
              id="regestration_type"
              name="regestration_type"
              onChange={handleInputs}
              value={inputs.regestration_type || ''}
            >
              <MenuItem value="self">Self</MenuItem>
              <MenuItem value="group">Group</MenuItem>
              <MenuItem value="corporate">Corporate</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={3}>
        <TextField
            required
            type="number"
            id="no_tickets"
            name="no_tickets"
            label="No of tickets"
            style={inputs.regestration_type === 'self' ? {disabled:true}:{}}
            onChange={handleInputs}
            value={inputs.no_tickets || ""}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
      application: state.application
  }
}

const mapDispatchToProps= dispatch =>{
  return{
    setApplication: (application) => dispatch(setApplication(application))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)

(UserDetails);
