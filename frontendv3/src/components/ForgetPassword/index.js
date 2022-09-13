import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import {useState, useEffect} from 'react';
import './style.css';

function ForgetPassword(){

    const[email, setEmail] = useState("");
    const[error, setError] = useState("");
    const [sucess, setSucess] = useState(false);
    const[password, setPassword] = useState("");

    useEffect(() => {
      setError('');
  }, [email, password])

    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.put(`${BASE_URL}/api/user/login/recuper`, {
            email: email,
          }, {
            headers: {
              'Authorization': `Basic ${null}` 
            }
          })
          .then(response =>{
            
          })

          setSucess(true);
          

    }catch(error){
        if(!error?.response){
            setError('No server response');
        } else if (error.response?.status === 400){
            setError('Missing name or password')
        } else if (error.response?.status === 401){
            setError('Não autorizado');
        }else{
            setError('login falhou');
        }
    }
    }

    return(
      <>  
        {sucess ? (
          <h1>nova senha</h1>
      ) : (
        <div className="wrap-register">
            <form className="register-form" onSubmit={handleSubmit}>
              <span className="register-form-title">Restore password</span>
              <span className="register-form-tile">
                <img src="{}" alt="" />
              </span>
              <div className="wrap-input">
                <input className={email !== "" ? 'has-val input' : 'input'} type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Digite o email da conta"> </span>
              </div>
              <div className="container-register-form-btn">
                <button className="register-form-btn"> Enviar </button>
              </div>
            </form>
          </div>
          )
        }
        </>
    );
}

export default ForgetPassword;