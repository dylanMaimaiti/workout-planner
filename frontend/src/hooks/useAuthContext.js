import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error("auth context is out of range");
    }
    return context;
}