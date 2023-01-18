import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login = () => {
    
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onChangeUser = ( { target } ) => {
        const { value } = target;
        setUsername(value);
    }

    const onChangePw = ( { target } ) => {
        const { value } = target;
        setPassword(value);
    }

    const onClickLogin = ( e ) => {
        e.preventDefault();
        const user = {
            username: userName,
            pw: password 
        }
        if(user.username == 'ali' && user.pw == 1234){
            navigate('/main');
        } else{
            navigate('/');
        }
    }

    return (
        <div className="wrap">
            <form id="formLogin" autoComplete="off">
                <h1> Login CCM </h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"> Usuario </label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={ onChangeUser } />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"> Contraseña </label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={ onChangePw }/>
                </div>
                <button type="submit" className="btn btn-outline-primary mx-2" onClick={ onClickLogin }>
                    Login
                </button>
                <button type="submit" className="btn btn-primary mx-2" onClick={ onClickLogin }>Registrarse</button>
            </form>
        </div>
    );
}