import { useContext } from "react";
import { AuthProvider } from "../context/AuthProvider";

const useAuth = () =>{
    const context = useContext(AuthProvider);
    return context;
}

export default useAuth;