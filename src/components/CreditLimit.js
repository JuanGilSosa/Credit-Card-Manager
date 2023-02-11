import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startSetlimit } from "../store/action/actionUser";

export const CreditLimit = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userSession } = useSelector(store => store.user);
    
    const [limit, setLimit] = useState(null);

    const onClickSetlimit = () => {
        dispatch(startSetlimit( {
            IdUser: userSession.ID_USER,
            Limite: parseFloat(limit)
        }));
    }

    const onChangeLimit = ( { target } ) => {
        const { value } = target;
        setLimit(value);
    }

    const onClickRollback = () => {
        setLimit(null);
        navigate('/main/manager');
    }

    return (
        <div className="mt-5">
            <div className="wrap p-3">
                <div className="col-lg-5">
                    <h5>Ingresa el limite que quieras para tus gastos</h5>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" onChange={ onChangeLimit }/>
                    </div>
                    <div className="form-text">
                        Esta función permite que vos puedas administrar mejor tus gastos dándote la 
                        posibilidad de ver si te pasaste del limite teniendo saldo <span className="text-danger"><b>deudor</b></span> o <span className="text-success"><b>acreedor</b></span>.
                    </div>
                    <div>
                        <button className="btn btn-success mt-3 me-3" onClick={ onClickSetlimit }>Guardar mi limite</button>
                        <button className="btn btn-primary mt-3" onClick={ onClickRollback }>Volver al administrador </button>
                    </div>
                </div>
            </div>
        </div>
    )
}