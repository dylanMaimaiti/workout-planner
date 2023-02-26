import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext.js";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = (props) => {
    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    //determine if there are anymore pages to go to
    const [ended, setEnded] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [maxPage, setMaxPage] = useState(0);

    //fetch all workouts only once, when the component first renders
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts/?page=" + props.page + "&size=" + props.size, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
        
            if (response.ok) {
                //using context to store all the info
                dispatch({ type: "SET_WORKOUTS", payload: data.workouts });
                setEnded(data.ended);
            } else {
                console.log("Error: " + data.error);
            }
        }
        if (user) {
            fetchWorkouts();
        }
    }, [dispatch, user, props.page, props.size, refresh]);

    const nextPage = () => {
        props.setPage(props.page + 1);
    }

    const backPage = () => {
        if (props.page > 1) {
            props.setPage(props.page - 1);
        } else {
            props.setPage(0);
        }
    }

    useEffect(() => {
        //current page == max num pages, then no next
        if (props.page === maxPage) {
            setEnded(true);
        } else {
            setEnded(false);
        }
    }, [maxPage, props.page]);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => {
                    return <WorkoutDetails forceRefresh={setRefresh} refresh={refresh} page={props.page} setPage={props.setPage} size={props.size} key={workout._id} workout={workout} />
                })}
                {workouts && <div className="pageChange">
                    <button disabled={props.page === 0} onClick={backPage}>Back</button>
                    <p>{props.page}</p>
                    <button disabled={ended} onClick={nextPage}>Next</button>
                </div>}
            </div>
            <WorkoutForm page={props.page} setPage={props.setPage} size={props.size} maxPage={maxPage} setMax={setMaxPage}/>
        </div>
    )
};

export default Home;