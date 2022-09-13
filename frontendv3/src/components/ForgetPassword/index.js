import axios from 'axios';
import { BASE_URL } from '../../utils/request';
import {useState, useEffect} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function ForgetPassword(){

    let navigate = useNavigate();

    const[email, setEmail] = useState("");
    const[error, setError] = useState("");
    const [sucess, setSucess] = useState(false);
    const[password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const[code, setCode] = useState("");

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
            if(response.data == true){
              setSucess(true);
            }
            if(response.data == false){
              alert("Não encontramos nenhum usuário com este email!")
              setSucess("")
            }
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

    const handleSubmitReset = async (e) => {
      e.preventDefault();

      if(!email | !password | !confirmPassword){
        alert("Preencha todos os campos!");
        return
      }
      if(password !=confirmPassword){
        alert("As senhas não são iguai");
        return
      }

      try{
          const response = await axios.put(`${BASE_URL}/api/user/login/recuper/change`, {
              email: email,
              code: code,
              newPassword : password
            }, {
              headers: {
                'Authorization': `Basic ${null}` 
              }
            })
            .then(response =>{
              if(response.data == "alterado"){
                alert("senha alterada com sucesso! Faça login.")
                navigate("/")
              }
              if(response.data == "InvalidCode"){
                alert("código inválido!")
              }
              if(response.data == null){
                alert("deu ruim")
              }
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
      <>  
        {sucess ? (
          <div className="wrap-register">
          <form className='register-form' onSubmit={handleSubmitReset}>
            <span className='register-form-title'>Reset Password</span>
            <div className="wrap-input">
                <input className={code !== "" ? 'has-val input' : 'input'} type="text" maxLength={6} 
                value={code}
                onChange={e => setCode(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Código de recuperação"> </span>
              </div>
              <div className="wrap-input">
                <input className={password !== "" ? 'has-val input' : 'input'} type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Nova senha"> </span>
              </div>
              <div className="wrap-input">
                <input className={confirmPassword !== "" ? 'has-val input' : 'input'} type="text"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Confirmar senha"> </span>
              </div>
              <div className="container-register-form-btn">
                <button className="register-form-btn"> Change Password </button>
              </div>
          </form>
          </div>
          

      ) : (
        <div className="wrap-register">
            <form className="register-form" onSubmit={handleSubmit}>
              <span className="register-form-title">Reset password</span>
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