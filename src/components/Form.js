import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { startAddMonth, startGetMonth } from "../store/action/actionMonth";

const validateForm = {
    'border': '1px solid red'
}

export const Form = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userSession } = useSelector(store => store.user);

    const cuotas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [valorEnCuota, setValorEnCuota] = useState(0);
    const [gastoTotal, setGastoTotal]     = useState(0);
    const [cantCuotas, setCantCuotas]     = useState(1);
    const [producto, setProducto]         = useState('');
    const [fechaCompra, setFechaCompra]   = useState( moment( new Date() ).format('YYYY-MM-DD HH:mm') );
    const [userSessionLocal, setUserSessionLocal] = useState({});

    const onChangeCuotas = ( { target } ) => {

        const { value } = target;
        setCantCuotas(value);
        
        if(!gastoTotal)
            return;
        
        const res = gastoTotal / value; // Usamos value por el tiempo en cambio de estado
        
        setValorEnCuota(res);

    }
    
    const onKeyDownGasto = ( { target }) => {
        const { value } = target;

        setGastoTotal(parseInt(value));
        const res = value / cantCuotas;
        
        setValorEnCuota(res);
    }

    const onClickAgregar = ( e ) => {
        
        e.preventDefault();

        let info = {
            NAME: producto,
            TOTAL: parseFloat(gastoTotal.toFixed(2)),
            FEES: parseInt(cantCuotas),
            MONTH_PAY: parseFloat(valorEnCuota.toFixed(2)),
            PURCHASE_DATE: moment(fechaCompra).format('YYYY-MM-DD HH:mm'),
            DATE_MONTH_PURCHASE: moment(fechaCompra).format('YYYY-MM-02 00:00'), // Seteo para que pueda hacer bien el calculo automatizado
            ID_USER: userSessionLocal.ID_USER
        };
        console.log(info);
        if(info.ID_USER == undefined){
            Swal.fire({
                icon: 'error',
                title: 'Ups 🤧',
                text: 'La sesión expiró! Tenes que iniciar sesión nuevamente ',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir a iniciar sesión'
            }).then( res => {
                if (res.isConfirmed){
                  navigate('/');
                  return;
                }
            });
        }

        if( info.NAME.length === 0 || info.TOTAL === 0 || info.PURCHASE_DATE === 'Invalid date' || info.DATE_MONTH_PURCHASE === 'Invalid date') {
            Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,
            }).fire({
                icon: 'error',
                title: 'Se produjo un error! ¿Llenaste todos los campos?'
            });
            return;
        }
        
        Swal.fire({
            title: '¿ Desea agregar a su registro ?',
            showDenyButton: true,
            confirmButtonText: 'Si, guadar',
            denyButtonText: `No, mejor no`,
          }).then( result => {
            if (result.isConfirmed) {
                dispatch(startAddMonth(info));
                dispatch(startGetMonth());
            }
          })
                
        document.getElementById('myForm').reset();
        onClickLimpiar();

    }

    const onChangeProducto = ( { target } ) => {
        const { value } = target;
        setProducto(value);
    }

    const onChangeFechaCompra = ( { target } ) => {
        const { value } = target;
        setFechaCompra(value);
    }

    const onClickLimpiar = () => {
        setValorEnCuota(0);
        setGastoTotal(0);
        setCantCuotas(1);
        setProducto('');
        setFechaCompra( moment( new Date() ).format('YYYY-MM-DD HH:mm') );
    }


    useEffect(() => { // Solución temporal, ver porqué se me pierde el estado de userSession
        if(userSession.ID_USER != 0)
            setUserSessionLocal(userSession);
        
    }, [userSession]);

    return (
        <div className="container-sm col-lg-6">
            
            <h1 className="mt-4 mb-4">Cargá tus compras 💳💰</h1>
            <form id="myForm">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <span>Descripcion de la compra: </span>
                        <input  placeholder="Ingrese descripcion ... por ej. Olla" 
                                className="form-control" 
                                type="text" 
                                max="50" 
                                onChange={onChangeProducto} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <span>$ Precio final: </span>
                        <input  type="number" 
                                className="form-control" 
                                placeholder="Ingrese gasto . . ."
                                onChange={onKeyDownGasto}/>
                    </div>
                    <div className="col-md-3 mb-3">
                        <span>Fecha compra: </span>
                        <input  type="datetime-local" 
                                className="form-control" 
                                onChange={onChangeFechaCompra}
                                value={ fechaCompra }
                                />
                    </div>
                    <div className="col-md-2 mb-3">
                        <span>Cuotas:</span>
                        
                        <select className="form-select" onChange={onChangeCuotas}>
                        {
                            cuotas.map( v => {
                                return <option key={v} value={v}> {v} </option>
                            } )
                        }
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label>$ Total en cuotas</label>
                        <input className="form-control" type="text" disabled placeholder={ valorEnCuota.toFixed(2) }/>
                    </div>
                </div>

                <div className="mt-1">
                    <button className="btn btn-danger m-1"  type="reset"  onClick={ onClickLimpiar }>Limpiar</button>
                    <button className="btn btn-success m-1" onClick={ onClickAgregar }>Agregar</button>
                </div>
            </form>
        </div>

    )
}