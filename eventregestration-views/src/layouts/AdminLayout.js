import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Button } from "@material-ui/core";

import cookie from 'react-cookies';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarButtons: {
    direction:'rtl',
    marginLeft: 'auto',
  },
}));



export default function AdminLayout() {
  const classes = useStyles();

  let history = useHistory();

  const handlelogout =()=> {
    localStorage.clear();
    cookie.remove('user', { path: '/admin' });
    history.replace("/admin/login");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            StackHack
          </Typography>
          <div className={classes.toolbarButtons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handlelogout}
            >Log out</Button>
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}
