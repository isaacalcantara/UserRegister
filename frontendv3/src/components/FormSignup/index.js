import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/request';
import './style.css';

const acessToken = 'f8e668c7-bace-4081-92ee-e7841bbc1d0d';

function FormSignup(){

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");

    useEffect(() => {
        setError('');
    }, [email, password])


  const handleSubmit = async (e) => {

    if(!email | !password | !name){
        alert("Preencha todos os campos!");
        return
    }

    e.preventDefault();
    try{
        const response = await axios.post(`${BASE_URL}/api/user/save`, {
            "name": name,
            "email": email,
            "password": password,
            "tipo": "normal-user",
            "status": true
          }, {
            headers: {
              'Authorization': `Basic ${null}` 
            }
          })
          .then(response =>{
            alert("Cadastrado com sucesso!");
          })

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
        <div className="wrap-register">
            <form className="register-form" onSubmit={handleSubmit}>
              <span className="register-form-title">New User</span>
              <span className="register-form-tile">
                <img src="{}" alt="" />
              </span>
              <div className="wrap-input">
                <input className={name !== "" ? 'has-val input' : 'input'} type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Name"> </span>
              </div>
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
              <div className="container-register-form-btn">
                <button className="register-form-btn">Register</button>
              </div>
            </form>
          </div>
    );

}

export default FormSignup;
