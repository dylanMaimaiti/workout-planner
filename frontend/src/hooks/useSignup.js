import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {state, dispatch} = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        //make sign up request
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json();
        //error handling
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            
            //now saving the JWT to local storage
            //console.log(json);
            localStorage.setItem("user", JSON.stringify(json));

            //update the auth context
            dispatch({type:"LOGIN", payload: json});
            setIsLoading(false);
        }

    }

    return {signup, isLoading, error}
}