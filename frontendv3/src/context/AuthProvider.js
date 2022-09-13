import axios from 'axios';
import { BASE_URL } from '../utils/request';
import {createContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});

    const userEmail = localStorage.getItem("email")

    if(userEmail){
        const response = axios.post(`${BASE_URL}/api/user/login/authtoken`, {
            email: userEmail
          }, {
            headers: {
              'Authorization': `Basic ${null}` 
            }
          })
          .then(response =>{
            setAuth(response.data);
          })
    }
    
    return (
        <AuthContext.Provider value={{signed: auth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;