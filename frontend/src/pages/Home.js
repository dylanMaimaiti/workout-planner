import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();

    //fetch all workouts only once, when the component first renders
    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts");
            const data = await response.json();

            if (response.ok) {
                //using context to store all the info
                dispatch({type:"SET_WORKOUTS", payload: data});
            }
        }

        fetchWorkouts();
    }, []);

    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
            <WorkoutForm />
        </div>
    )
};

export default Home;