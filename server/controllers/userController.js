const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//creates a token using the document id as the payload
//uses a secret env string to sign the token which expires in 1 hour
const createToken = (_id) => {
    jwt.sign({_id}, process.env.SECRET, {expiresIn: "1h"})
}


//function to login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.loginUser(email, password);

        //create token
        const token = createToken(user._id);

        res.status(200).json({email, token});
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}

//function to sign up user
const signupUser = async (req, res) => {
    const {email, password} = req.body;
    //attempt to sign up the user, if successful creates new document in db
    try {
        const user = await User.signupUser(email, password);

        //create an auth token
        const token = createToken(user._id);

        //send back email and the new user doc object
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {loginUser, signupUser};