import {createContext, useReducer} from "react";

//useing context and reducer for all workout data to be in sync

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case "SET_WORKOUTS":
            return {workouts:action.payload}
        case "CREATE_WORKOUT":
            return {workouts: [action.payload, ...state.workouts]}
        default:
            return state;
    }
}

export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null,
    });

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}