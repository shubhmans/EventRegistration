import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  modalbody: {
    margin: theme.spacing(3),
    backgroundColor: "white",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
}));
export default function Table() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setdata] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: "Registeration Id", field: "reg_no" },
      { title: "Name", field: "full_name" },
      { title: "Date", field: "reg_date" },
      {
        title: "",
        field: "",
        render: (rowData) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              //onClick={handleData(rowData)}
            >
              View Application
            </Button>
          </div>
        ),
      },
      // {
      //   title: "Birth Place",
      //   field: "birthCity",
      //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
      // },
    ],
  });
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleData = (rowData) => {
    setdata(rowData);
    handleOpen();
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/userdata")
      .then((res) => {
        if (res.status === 200) {
          setState((prevState) => ({
            ...prevState,
            data: res.data,
          }));
          console.log(state);
        }
      })
      .catch((error) => {
        alert("Internal server error" + error);
      });
  }, []);
  return (
    <div>
      <MaterialTable
        title="Editable Example"
        onRowClick={(event, rowData) => handleData(rowData)}
        columns={state.columns}
        data={state.data}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalbody}>
          {data.reg_id}
          {data.full_name} <br />
          {data.reg_date}
          <br />
          {data.email_id}
          <br />
          {data.regestration_type}
          <br />
          {data.phone_no}
          <br />
          {data.no_tickets}
          <br />
          {data.id_image}
          <br />
          <img
            src={"http://localhost:8080/admin/userimage/" + data.id_image}
            height="25%"
            width="25%"
          />
        </div>
      </Modal>
    </div>
  );
}
