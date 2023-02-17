const User = require("../models/userModel.js");

//function to login user
const loginUser = async (req, res) => {

    res.json({mssg: "login user"});
}

//function to sign up user
const signupUser = async (req, res) => {

    res.json({mssg: "signup user"});
}

module.exports = {loginUser, signupUser};