import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const styleLink = {
    color: 'white',
    textDecoration: 'none'
  }

export const Login = () => {
    
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const onClickLogin = () => {
        const user = {
            username: userName,
            pw: password 
        }
        if(user.username == 'prueba' && user.pw == 1234)
            navigate.push('/manager');
    }

    return (
        <div className="wrap">
            <form id="formLogin">
                <h1> Login CCM </h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> Usuario </label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Contraseña </label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary mx-2" onClick={ onClickLogin }>
                    <Link style={ styleLink } to='/main'>Login</Link>
                </button>
                <button type="submit" className="btn btn-primary mx-2" onClick={ onClickLogin }>Registrarse</button>
            </form>
        </div>
    );
}