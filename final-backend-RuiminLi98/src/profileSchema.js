const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: String,
    headline: String,
    followers: [],
    email: String,
    zipcode: String,
    dob: String,
    avatar: String
})

module.exports = profileSchema;
