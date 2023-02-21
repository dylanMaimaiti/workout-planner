import {createContext, useReducer, useEffect} from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    //only 2 cases
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}


export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    //check if on first load the user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({type:"LOGIN", payload: user});
        }
    }, []);

    //providing global state to children
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}