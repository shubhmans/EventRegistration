const mongoose = require("mongoose");
var registrationDetails = mongoose.Schema({
    full_name: String,
    email_id: String,
    phone_no: Number,
    id_image: String,
    regestration_type: String,
    no_tickets: Number,
    reg_date: String,
    reg_no: String
});

module.exports = mongoose.model("registration_details", registrationDetails);