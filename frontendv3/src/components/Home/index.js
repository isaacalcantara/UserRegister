import AuthContext from "../../context/AuthProvider";
import { useContext } from "react";

function Home(){

    const {setAuth} = useContext(AuthContext);   

    const handleSubmit = async (e) => {
        setAuth("logout");
        localStorage.setItem("user_token", null)
    }

    return(
        <div>
        <h1>Logado!</h1>
        <button>Sair ainda não está funcionando </button>
        </div>
        
    )
}

export default Home;