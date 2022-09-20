import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";
import './style.css'
import {useHref, useNavigate} from 'react-router-dom';

function Home(){

    let navigate = useNavigate()

    const {setAuth} = useContext(AuthContext);   

    const handleSubmit = async (e) => {
        localStorage.setItem("user_token", '')
        if(!localStorage.getItem("user_token")){
            navigate("/")
        }
    }

    return(
        <div className="bienvenido">
        <h1>Logado!</h1>
        <button className="btn-sair" onClick={handleSubmit}>SAIR</button>
        </div>
    )
}

export default Home;