import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/request';
import './style.css';

function FormSignin(){

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[error, setError] = useState("");

  const handLogin = () => {
    useEffect(()=>{
      axios.post(`${BASE_URL}/api/user/save`, {
        name: name,
        email: email,
        password: password ,
        "tipo": "normal_user",
        "status": true
      }, {
        headers: {
          'Authorization': `Basic ${null}` 
        }
      })
      .then(response =>{
        console.log(response.data)
      })

  }, []);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
     

    return(
        <div className="wrap-login">
            <form className="login-form" onSubmit={handleSubmit}>
              <span className="login-form-title">Bem Vindo!</span>
              <span className="login-form-tile">
                <img src="{}" alt="" />
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
                <a className="txt2" href="#">Remember now.</a>
                
                </div> 
              </div>
            </form>
          </div>
    );

}

export default FormSignin;
