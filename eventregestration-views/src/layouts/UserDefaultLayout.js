import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbarButtons: {
    direction: "rtl",
    marginLeft: "auto",
  },
}));

function UserDefaultLayout() {
  let history = useHistory();
  const classes = useStyles();
  const handlelogin = () => {
    history.push("/admin/login");
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            StackHack 1.0
          </Typography>
          <div className={classes.toolbarButtons}>
            <Button variant="contained" color="secondary" onClick={handlelogin}>
              Login
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default UserDefaultLayout;
