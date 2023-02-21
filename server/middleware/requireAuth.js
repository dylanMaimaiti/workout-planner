const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    
    //verify user auth
    //console.log(req.headers);
    const {authorization} = req.headers;
    //no auth value
    if (!authorization) {
        return res.status(401).json({error:"Authorization token is required"});
    }

    const raw = authorization.split(' ');
    const token = raw[1];

    //need to verify the token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        //attach the user id to the request object for the other middleware or code to see and use
        req.user = await User.findOne({_id}).select("_id");
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = requireAuth;