const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  user_id: Number,
  user_name: String,
  user_contact_no: Number,
  user_email: String,
  no_of_tickets: Number,
  user_image: String,
});

module.exports = mongoose.model("user", userSchema);
