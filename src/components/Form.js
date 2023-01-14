import moment from "moment/moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startAddMes, startGetMes } from "../store/action/actionMes";

export const Form = () => {
    
    const dispatch = useDispatch();

    const cuotas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [valorEnCuota, setValorEnCuota] = useState(0);
    const [gastoTotal, setGastoTotal]     = useState(0);
    const [cantCuotas, setCantCuotas]     = useState(1);
    const [producto, setProducto]         = useState('');

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

    const onClickAgregar = () => {

        const date = new Date();
        const now = new Date(date.getFullYear(), date.getMonth(), 1, 0,0);

        const info = {
            NAME: producto,
            TOTAL: parseFloat(gastoTotal.toFixed(2)),
            FEES: parseInt(cantCuotas),
            MONTH_PAY: parseFloat(valorEnCuota.toFixed(2)),
            PURCHASE_DATE: moment().format('YYYY-MM-DD HH:mm'),
            DATE_MONTH_PURCHASE: moment(now).format('YYYY-MM-DD HH:mm')
        }

        dispatch(startAddMes(info));
        dispatch(startGetMes());
    }

    const onChangeProducto = ( { target } ) => {
        const { value } = target;
        setProducto(value);
    }

    const onClickLimpiar = () => {
 
    }

    
    return (
        <div className="container-sm col-lg-6">
            
            <h1>Carga de gastos / compras</h1>

            <div className="row">
                <div className="col-md-4">
                    <span>Descripcion de la compra: </span>
                    <input placeholder="Ingrese descripcion ... por ej. Olla" className="form-control" type="text" max="50" onChange={onChangeProducto}/>
                </div>
                <div className="col-md-6 mb-3">
                    <span>Precio final: </span>
                    <input  type="number" 
                            className="form-control" 
                            placeholder="Ingrese gasto . . ."
                            onChange={onKeyDownGasto}/>
                </div>

                <div className="col-md-2">
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
                    <input className="form-control" type="text" disabled placeholder={valorEnCuota}/>
                </div>
            </div>

            <div className="mt-1">
                <button className="btn btn-danger m-1" onClick={ onClickLimpiar }>Limpiar</button>
                <button className="btn btn-success m-1" onClick={ onClickAgregar }>Agregar</button>
            </div>

        </div>

    )
}