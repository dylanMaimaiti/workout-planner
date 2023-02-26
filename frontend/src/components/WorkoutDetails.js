import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({page, setPage, workout, forceRefresh, refresh}) => {
    const {workouts, dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`,
            }
        });
        const data = await response.json();

        if (response.ok) {
            updatePagination(workouts.length);
            //remove some workout
            dispatch({type: "DELETE_WORKOUT", payload: data});
        }
    }

    const updatePagination = (length) => {
        //that page only had 1 item
        if (length === 1) {
            if (page > 1) {
               setPage(page - 1); 
            } else {
                setPage(0);
            }
        } else {
            forceRefresh(!refresh);
        }
    }

    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg) </strong> {workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;