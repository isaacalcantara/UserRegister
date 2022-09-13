import axios from 'axios';
import {useEffect, useState, useRef, useContext} from 'react';
import AuthContext from '../../context/AuthProvider';
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from '../../utils/request';
import './style.css';

function FormSignin(){

  const {setAuth} = useContext(AuthContext);   

  const errRef = useRef(3939);


    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const [sucess, setSucess] = useState(false);

    useEffect(() => {
        setError('');
    }, [email, password])


  const handleSubmit = async (e) => {

    if(!email | !password){
        setError("Preencha todos os campos!");
        return
    }

    e.preventDefault();
    try{
        const response = await axios.put(`${BASE_URL}/api/user/login`, {
            email: email,
            password: password ,
          }, {
            headers: {
              'Authorization': `Basic ${null}` 
            }
          })
          .then(response =>{
            const accessToken = response?.data?.token
            const returnedEmail = response?.data?.email
            const exists = response?.data?.exists

            localStorage.setItem("user_token", accessToken)
            localStorage.setItem("email", returnedEmail)

            if(exists == true){
              setSucess(true);
            } else if( exists == false){
              setError("Nenhum usuário com este email foi encontrado!")
            }

  
          })

          setEmail('');
          setPassword('');

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

        errRef.current.focus();
    }


    
  }
     
  let navigate = useNavigate();

    return(
        <>  
        {sucess ? (
          <section>
           <h2> YOU ARE LOGED </h2> 
           <a href='/home'> GO TO HOME</a>
           </section>
        ) : (
        <div className="wrap-login">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="login-form-title">Bem Vindo!</span>
              <span className="login-form-tile">
              <p ref = {errRef} className={error ? "errMsg" : "offscreen"} aria-live="assertive" >{error}</p>
              </span>
              <div className="wrap-input">
                <input className={email !== "" ? 'has-val input' : 'input'} type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"> </span>
              </div>
              <div className="wrap-input">
                <input className={password !== "" ? 'has-val input' : 'input'} type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"> </span>
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn">Login</button>
              </div>
              <div className="text-center">
                <div>
                <span className="txt1"> Don't have an account? </span>
                <a className="txt2" href="/register">Create account.</a> <br />
                <span className="txt1"> forget password? </span>
                <a className="txt2" href="/fgtpassword">Remember now.</a>
                
                </div> 
              </div>
            </form>
          </div>
        )
        }
        </>
    );
}

export default FormSignin;
