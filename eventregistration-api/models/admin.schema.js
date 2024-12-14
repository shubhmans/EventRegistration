const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var adminSchema = mongoose.Schema({
  email: String,
  password: String,
});

adminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

adminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("admin", adminSchema);