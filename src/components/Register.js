import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { validateEmail } from "../helpers/funcHelper";
import { startRegister } from "../store/action/actionUser";
import { ValidateRegisterModal } from "./modal/ValidateRegister";

export const Register = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [surname, setSurname]   = useState('');
    const [email, setEmail]       = useState('');
    const [name, setName]         = useState('');

    const navigate = useNavigate();

    const onChangeName = ( { target } ) => {
        const { value } = target;
        setName(value);
    } 

    const onChangeSurname = ( { target } ) => {
        const { value } = target;
        setSurname(value);
    } 

    const onChangeEmail = ( { target } ) => {
        const { value } = target;
        setEmail(value);
    } 

    const onChangeUsername = ( { target } ) => {
        const { value } = target;
        setUsername(value);
    } 

    const onChangePassword = ( { target } ) => {
        const { value } = target;
        setPassword(value);
    } 

    const onClickRegister = ( e ) => {
        e.preventDefault();
        
        const newUser = {
            username: username,
            password: password,
            surname: surname,
            email: email,
            name: name
        }

        if( !validateEmail(email) ){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Verifique que el email ingresado sea correcto!',
            });
            return;
        }

        dispatch( startRegister(newUser) );
        navigate('/');
    
    }

    return (
        <>
        <div className="container">
            <div className="text-center mt-5 mb-5">
                
                <h4> Hola 👋, para registrarte te vamos a pedir que llenes este formulario</h4>
            </div>
            <div className="">
                <form autoComplete="off" className="col-md-6">
                    <h5>Datos personales 🌐</h5>
                    <hr />
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input type="text" className="form-control" maxLength={50} onChange={ onChangeName }/>
                            
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido</label>
                        <input type="text" className="form-control" maxLength={50} onChange={ onChangeSurname }/>
                    </div>
                    <h5>Datos del usuario 👨‍🚀</h5>
                    <hr />
                    <div className="mb-3">
                        <label className="form-label">Nombre de usuario</label>
                        <input type="text" className="form-control" maxLength={50} onChange={ onChangeUsername }/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña (<b className="form-text">máximo 20 caracteres</b>) </label>
                        <input type="password" className="form-control" maxLength={20} onChange={ onChangePassword }/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={ onChangeEmail }/>
                        <div className="form-text"> Escribí tu email para recibir un codigo de confirmación </div> 
                    </div>

                    <button type="submit" 
                            className="btn btn-success m-2" 
                            onClick={ onClickRegister }
                            // data-bs-toggle="modal" 
                            //data-bs-target="#ModalValidateRegister"
                            >Registrarse</button>
                    <button className="btn btn-danger m-2"> Limpiar </button>
                </form>
            </div>
            <div className="form-text"><Link to='/'>Acceder</Link> | <Link>¿Olvidaste tu contraseña?</Link></div>
        </div>

        <ValidateRegisterModal />
        
        </>
    )
}