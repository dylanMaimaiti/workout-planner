const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

//get all workouts
//with pagination (has a start page index and number of pages to get)
const get_workouts = async (req, res) => {
    
    const user_id = req.user._id;
    //start at 0
    let pageNum = parseInt(req.query.page);
    let numItems = parseInt(req.query.size);
    if (pageNum < 0 || numItems < 0) {
        res.status(400).json({error: "Invalid page number or number of items per page"});
    }
    //gets all of the workouts and sort it
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});

    const pagedWorkouts = [];
    let ended = false;
    //extract the paged values
    for (let i = (pageNum*numItems); i < (pageNum*numItems)+numItems; i++) {
        //ran out of workouts for the page
        if (i >= workouts.length) {
            break;
        }
        pagedWorkouts.push(workouts[i]);
    }
    //if user requests the last page let them know
    if ( (pageNum*numItems)+(numItems) >= workouts.length) {
        ended = true;
    }

    res.status(200).json({"workouts": pagedWorkouts, ended});
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
        const user_id = req.user._id;

        const workout = await Workout.create({title, load, reps, user_id});
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