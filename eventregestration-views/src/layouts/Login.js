import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Paper, Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import { useCookies } from 'react-cookie';
import ErrorDialog from '../components/ErrorDialog';
import querytring from 'querystring';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  layout: {
    width: "xs",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
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
}));

function Login() {
  const [inputs, setInputs] = useState("");
  const [cookie, setCookie] = useCookies(['user'])

  const [error, setError] = useState(false);
  const [diaMessage, setDiaMessage] = useState("");
  const classes = useStyles();
  let history = useHistory();
  const handleInputs = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/admin/login", querytring.stringify({
        inputs
      }),config)
      .then((response) => {
        if (response.data.status === "success") {
          setCookie("user", response.data.type, {
            maxAge: 3600
          })
          history.push("/admin/dashboard");
        }
        else{
          setError(true);
          setDiaMessage("Invalid credentials !");
        }
      });
  };
  return (
    <div>
      {error ?
              <ErrorDialog message={diaMessage} /> : ""}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            StackHack 1.0
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.layout}>
        <Paper className={classes.paper} elevation={5}>
          <form id="user-login" onSubmit={handleSubmit}>
          <Typography variant="h6">ADMIN LOGIN</Typography>
          <Grid container spacing={5}>
            <Grid item md={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                onChange={handleInputs}
                value={inputs.email || ""}
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                required
                id="password"
                type="password"
                name="password"
                label="Password"
                onChange={handleInputs}
                value={inputs.password || ""}
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
          </form>
        </Paper>
      </div>
    </div>
  );
}
export default Login;
