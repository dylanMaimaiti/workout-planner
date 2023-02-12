import { useEffect, useState } from "react";

//components
import WorkoutDetails from "../components/WorkoutDetails";


const Home = () => {
    const [workouts, setWorkouts] = useState(null);

    //fetch all workouts only once, when the component first renders
    useEffect( () => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts");
            const data = await response.json();

            if (response.ok) {
                setWorkouts(data);
            }
        }

        fetchWorkouts();
    }, []);

    return (
        <div className="home">
            <div className="worksout">
                {workouts && workouts.map((workout) => {
                    <WorkoutDetails key={workout._id} workout={workout} />
                })}
            </div>
        </div>
    )
};

export default Home;