import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { fetchService } from "../services/fetchService";
import { getUserSession, setSessionUser, startLogin } from "../store/action/actionUser";


export const Login = () => {
    
    const dispatch = useDispatch();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { userSession } = useSelector( store => store.user );
    
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
        
        dispatch( startLogin( user ) );
        
    }

    /**
     * @description Esta fue la solucion que se me ocurrio para hacer un login, cuando detecte cambio en el state userSession que navege al main 
     * si logro encontrar otra forma, bienvenida sea, porque esta creo que es mala practica.
     */
    useEffect(() => {
        if(userSession.ID_USER)
            navigate('/main/manager');
    }, [userSession]);
    
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