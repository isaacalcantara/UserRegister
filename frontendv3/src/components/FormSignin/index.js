import axios from 'axios';
import {useEffect, useState, useRef, useContext} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import AuthContext from '../../context/AuthProvider';
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from '../../utils/request';
import './style.css';

function FormSignin(){

  const {setAuth} = useContext(AuthContext);   

  const errRef = useRef(3939);
  const teste = true;


    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const [sucess, setSucess] = useState(false);
    const [captcha, setCaptcha] = useState(false);

    useEffect(() => {
        setError('');
    }, [email, password])


  const handleSubmit = async (e) => {
    if(!email | !password){
      alert("Preencha todos os campos!");
      return
    }
    if(captcha){
    } else{
      alert("Ops! Prove que você é humano!");
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
            console.log(exists);

            if(exists == true){
              setSucess(true);
            } else if( exists == false){
              alert("Não encontrado. Email ou senha incorretos!")
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

  function onChange(value) {
    console.log("Captcha value:", value);
    if(value != null){
      setCaptcha(true)
    } else{
      setCaptcha(false)
    }
  }


    return(
        <>  
        {sucess ? (
          <div>
          <span className="login-form-title">Logado com sucesso!</span>
          <a href="/home" className='login-form-title'> GO TO HOME!</a>
            
          </div>
         ) : (
        <div className="wrap-login">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="login-form-title">Bem Vindo!</span>
              <span className="login-form-tile">
              <span className="login-form-title"></span>
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
              <div className="">
              <ReCAPTCHA className='captcha'
              size="normal"
              sitekey="6LcCsgwiAAAAAIyVeg8vePjC_uPmMs2qkFusPKqU"
              onChange={onChange}
              />
              </div>
              <div className="container-login-form-btn">
                <button className="login-form-btn">Login</button>
              </div>
              <div className="text-center">
                <div>
                <span className="txt1"> Don't have an account? </span>
                <a className="txt2" href="/register">Create account.</a> <br />
                <span className="txt1"> Forget password? </span>
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
