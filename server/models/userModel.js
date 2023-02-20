const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation (didn't validate the email (might convert it to usernames) or confirm the password is strong enough)

    //no value for either field
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const exists = await this.findOne({email});

    if (exists) {
        //throw an error
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user;
}

//making a static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    //find the email in the db
    const user = await this.findOne({email});

    if (!user) {
        throw Error("Invalid login credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    //user is valid
    if (match) {
        return user;
    } else {
        throw Error("Invalid login credentials");
    }
}

module.exports = mongoose.model("User", userSchema);