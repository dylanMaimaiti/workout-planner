import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = ({page, setPage, size, maxPage, setMax}) => {
    const {workouts, dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in");
            return;
        }
        const workout = {title, load, reps};

        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            }
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setEmptyFields(data.emptyFields);
        }
        if (response.ok) {
            setTitle("");
            setReps("");
            setLoad("");
            setError(null);
            setEmptyFields([]);
            //update pagination
            updatePagination(workouts.length);
            //added to only the home page since it's sorted by time created
            if (page === 0) {
                dispatch({type: "CREATE_WORKOUT", payload: data});
            }
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
        //needed to move a workout over so i delete from screen and on next page request it'll show up
        } else if (length === size) {
            dispatch({type: "DELETE_WORKOUT", payload: workouts[length-1]});
            setMax(maxPage+1);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes("title") ? "error" : ""}/>
            <label>Load (in kg):</label>
            <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} className={emptyFields.includes("load") ? "error" : ""}/>

            <label>Reps:</label>
            <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} className={emptyFields.includes("reps") ? "error" : ""}/>

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm;