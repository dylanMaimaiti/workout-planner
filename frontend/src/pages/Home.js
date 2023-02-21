import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from "../hooks/useAuthContext.js";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    //fetch all workouts only once, when the component first renders
    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts", {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                //using context to store all the info
                dispatch({type:"SET_WORKOUTS", payload: data});
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user]);

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