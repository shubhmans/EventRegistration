import React, { useState, useEffect } from "react";
import Login from "../../layouts/Login";
import AdminLayout from "../../layouts/AdminLayout";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
<<<<<<< HEAD
import { Grid, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../layouts/Table";
import RegestrationChart from "../../components/RegestrationChart";
=======
import {Grid, Paper, Divider, Card, CardContent} from '@material-ui/core' 
import {makeStyles} from '@material-ui/core/styles'
import StickyHeadTable from "../../layouts/Table";
import RegestrationChart from '../../components/RegestrationChart';
>>>>>>> d760748ebfd8005427467863f277be349359976d

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "4%",
  },
  container: {
    maxHeight: 440,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AdminApplication() {
  const classes = useStyles();
  const [totalRegestration, settotalRegestration] = useState(0)
  const [todayRegestration, settodayRegestration] = useState(0)
  const [totalTickets, settotalTickets] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:8080/admin/userstats')
      .then((res)=>{
          if(res.status === 200){
            settodayRegestration(res.data.reg_today);
            settotalTickets(res.data.total_tickets);
            settotalRegestration(res.data.total_users);
          }
      })
      .catch((error)=>{
          alert('Internal server error'+error);
      })   
  })
  return (
    <React.Fragment>
      <AdminLayout />
      <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
<<<<<<< HEAD
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}></Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.root}></Paper>
=======
        <Grid item xs={12} md={4}>
          <Paper className ={classes.root}>
            <Card >
              <CardContent>
                <Typography>{totalRegestration}</Typography>
                <Typography>Total Regestrations</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className ={classes.root}>
            <Card >
              <CardContent>
                <Typography>{todayRegestration}</Typography>
                <Typography>Today's Regestration</Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className ={classes.root}>
            <Card >
              <CardContent>
                <Typography>{totalTickets}</Typography>
                <Typography>Total Tickets sold</Typography>
              </CardContent>
            </Card>
          </Paper>
>>>>>>> d760748ebfd8005427467863f277be349359976d
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <RegestrationChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Table />
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </React.Fragment>
  );
}

export default AdminApplication;
