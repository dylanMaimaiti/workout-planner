const express = require("express");
const router = express.Router();

//controller functions
const {
    create_workout,
    get_workouts,
    get_workout,
    delete_workout,
    update_workout
} = require("../controllers/workoutController.js");

//GET all workouts
router.get("/", get_workouts);

//GET a single workout
router.get("/:id", get_workout);

//POST a new workout
router.post("/", create_workout);

//DELETE a workout
router.delete("/:id", delete_workout);

//UPDATE a workout
router.patch("/:id", update_workout);


module.exports = router;