import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext);
    
    //make sure in scope of context
    if (!context) {
        throw Error("not in scope");
    }
    
    return context;
}