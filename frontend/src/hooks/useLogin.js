import {useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {state, dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        //make sign up request
        const response = await fetch("/api/user/login", {
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
            localStorage.setItem("user", JSON.stringify(json));

            //update the auth context
            dispatch({type:"LOGIN", payload: json});
            setIsLoading(false);
        }
    }

    return {login, isLoading, error}
}