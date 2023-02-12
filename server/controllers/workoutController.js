const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

//get all workouts
const get_workouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});

    res.status(200).json(workouts);
}

//get a single workout
const get_workout = async (req, res) => {
    const {id} = req.params;

    //confirm the id is a valid mongoDB id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
        return res.status(404).json({error: "No such workout"});
    }

    res.stauts(200).json(workout);
}

//create a workout
const create_workout = async (req, res) => {
    const {title, load, reps} = req.body;
    //make sure all fields are not empty so they conform with the data schema
    let emptyFields = [];
    if (!title) {
        emptyFields.push("title");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (!reps) {
        emptyFields.push("reps");
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields});
    }
    //add new document to db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}


//delete a workout
const delete_workout = async (req, res) => {
    //the document id
    const {id} = req.params;

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }
    //delete the document
    const workout = await Workout.findOneAndDelete({_id: id});

    //confirm document was found and deleted
    if (!workout) {
        return res.status(400).json({error: "No such workout"});
    }
    res.status(200).json(workout);
};

//update a workout
const update_workout = async (req, res) => {
    const {id} = req.params;

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout"});
    }

    //destructures the data in the body of the request
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    //confirm document was found and updated
    if (!workout) {
        return res.status(400).json({error: "No such workout"});
    }
    
    res.status(200).json(workout);
}


module.exports = {
    create_workout,
    get_workouts,
    get_workout,
    delete_workout,
    update_workout,
};