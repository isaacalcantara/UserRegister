import {useState} from 'react';
import './style.css';

function ForgetPassword(){

    const[email, setEmail] = useState("");

    const handleSubmit = async (e) => {
    }

    return(
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

export default ForgetPassword;