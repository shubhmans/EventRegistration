const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const regestrationDetailsSchema = require("../models/regestration_details.schema");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-67xx5.mongodb.net/event_management?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "/home/dataone-7/Downloads/personal/StackHack/eventregestration/eventregistration-api/user-images/"
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/fileupload", upload.single("image"), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: req.file.filename,
    });
  else res.status("409").json("No files to uplaod");
});

router.post("/apply", async (req, res) => {
  let user = new regestrationDetailsSchema();
  user.full_name = req.body.fullname;
  user.email_id = req.body.email_id;
  user.phone_no = req.body.phone_no;
  user.id_image = req.body.id_image;
  user.regestration_type = req.body.regestration_type;
  user.no_tickets = req.body.no_tickets;
  user.reg_date = new Date().toISOString();

  await regestrationDetailsSchema.countDocuments({}, (err, count) => {
    user.reg_no = "reg-" + (count + 1);
  });

  await user.save((error) => {
    if (error) {
      throw error;
    } else {
      res.send(user.reg_no);
    }
  });
});

module.exports = router;
