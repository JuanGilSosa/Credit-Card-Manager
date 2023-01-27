import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { startLogin } from "../store/action/actionUser";


export const Login = () => {

    const dispatch = useDispatch();

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { userSession } = useSelector(store => store.user);

    const navigate = useNavigate();

    const onChangeUser = ({ target }) => {
        const { value } = target;
        setUsername(value);
    }

    const onChangePw = ({ target }) => {
        const { value } = target;
        setPassword(value);
    }

    const onClickLogin = (e) => {
        e.preventDefault();
        const user = {
            username: userName,
            pw: password
        }

        dispatch(startLogin(user));

    }

    /**
     * @description Esta fue la solucion que se me ocurrio para hacer un login, cuando detecte cambio en el state userSession que navege al main 
     * si logro encontrar otra forma, bienvenida sea, porque esta creo que es mala practica.
     */
    useEffect(() => {
        if (userSession.ID_USER)
            navigate('/main/manager');
    }, [userSession]);

    return (
        <div className="">
            <div className="text-center mt-3 p-3">
                <h1> Bienvenido al sistema CCM para gestionar tus gastos 🤑</h1>
            </div>
            <div className="wrap " >
                <form className="col-lg-3 m-1 mt-5"  id="formLogin" autoComplete="off">
                    <h1 className="mb-4 text-center"> Login </h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label"> Usuario </label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label"> Contraseña </label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={onChangePw} />
                        <Link>¿Olvidaste la contraseña?</Link>
                    </div>
                    <div className="d-grid gap-2 mt-4">
                        <button type="submit" className="btn btn-primary btn-block" onClick={onClickLogin}>Ingresar</button>
                    </div>
                    <div className="form-text">
                        <label className="me-2">¿ Es tu primera vez ?</label><Link to='/register'>Registrate</Link> <br />
                    </div>
                </form>
            </div>
        </div>
    );
}