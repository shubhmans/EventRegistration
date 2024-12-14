const adminSchema = require("../models/admin.schema");
const user = require("../models/regestration_details.schema");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var path = require("path");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-67xx5.mongodb.net/event_management?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
router.post("/signup", async (req, res) => {
  let admin = await adminSchema.findOne({ email: req.body.email }, function (
    error,
    result
  ) {
    if (error) {
      throw error;
    }
  });
  if (admin) {
    return res.send(`user already exist ${admin}`);
  } else {
    admin = new adminSchema();
    admin.email = req.body.email;
    admin.password = admin.generateHash(req.body.password);

    await admin.save(function (error) {
      if (error) {
        throw error;
      } else {
        res.send(admin);
      }
    });
  }
});
router.post("/login", (req, res) => {
  console.log("User logged in .");

  let adminpresent = adminSchema
    .findOne({ email: req.body.email }, function (error, result) {
      if (error) {
        throw error;
      } else console.log(result);
    })
    .then(function (admin) {
      if (!admin) {
        return res.send("no user");
      } else {
        console.log(admin);
        bcrypt.compare(req.body.password, admin.password, function (
          err,
          result
        ) {
          if (result === true) {
            return res.send({ status: "success", type: "admin" });
          } else {
            return res.send("incorrect password");
          }
        });
      }
    });
});

router.get("/userstats", async (req, res) => {
  let total_users = await user.countDocuments({}, (err, count) => {
    if (err) throw err;
  });

  let reg_today = await user.aggregate(
    [
      {
        $project: {
          reg_date: { $dateFromString: { dateString: "$reg_date" } },
        },
      },
      {
        $project: {
          day: { $dayOfMonth: "$reg_date" },
          month: { $month: "$reg_date" },
          year: { $year: "$reg_date" },
        },
      },
      {
        $match: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          day: new Date().getDate(),
        },
      },
      { $group: { _id: "null", count: { $sum: 1 } } },
    ],
    (err, count) => {
      if (err) throw err;
    }
  );
  let count = 0;

  if (reg_today.length > 0) {
    count = reg_today[0].count;
  }

  let total_tickets = await user.aggregate(
    [{ $group: { _id: "null", no_tickets: { $sum: "$no_tickets" } } }],
    (err, count) => {
      if (err) throw err;
    }
  );
  res.status("200").json({
    total_users: total_users,
    reg_today: count,
    total_tickets: total_tickets[0].no_tickets,
  });
});
router.post("/users", async (req, res) => {
  console.log("Retrieving the regestration stats ..");

  const duration = req.body.duration;

  if (duration == "current_month") {
    let reg_data = await user.aggregate(
      [
        {
          $project: {
            reg_date: { $dateFromString: { dateString: "$reg_date" } },
          },
        },
        {
          $project: {
            day: { $dayOfMonth: "$reg_date" },
            month: { $month: "$reg_date" },
            year: { $year: "$reg_date" },
          },
        },
        {
          $match: {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          },
        },
        { $group: { _id: "$day", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ],
      (err, count) => {
        if (err) throw err;
      }
    );

    res.status("200").json({
      reg_data: reg_data,
    });
  } else if (duration == "last_month") {
    let reg_data = await user.aggregate(
      [
        {
          $project: {
            reg_date: { $dateFromString: { dateString: "$reg_date" } },
          },
        },
        {
          $project: {
            day: { $dayOfMonth: "$reg_date" },
            month: { $month: "$reg_date" },
            year: { $year: "$reg_date" },
          },
        },
        {
          $match: {
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
          },
        },
        { $group: { _id: "$day", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ],
      (err, count) => {
        if (err) throw err;
      }
    );
    res.status("200").json({
      reg_data: reg_data,
    });
  } else if (duration == "year") {
    let reg_data = await user.aggregate(
      [
        {
          $project: {
            reg_date: { $dateFromString: { dateString: "$reg_date" } },
          },
        },
        {
          $project: {
            day: { $dayOfMonth: "$reg_date" },
            month: { $month: "$reg_date" },
            year: { $year: "$reg_date" },
          },
        },
        { $match: { year: new Date().getFullYear() } },
        { $group: { _id: "$month", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ],
      (err, count) => {
        if (err) throw err;
      }
    );
    res.status("200").json({
      reg_data: reg_data,
    });
  }
});

router.get("/userdata", (req, res) => {
  user.find({}, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
router.get("/userimage/:id", (req, res) => {
  //console.log(req,'file')
  user.findOne({ id_image: req.params.id }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result.id_image);
      res.status(200).sendFile(result.id_image, {
        root: path.join(__dirname, "../user-images"),
      });
    }
  });
});
module.exports = router;
