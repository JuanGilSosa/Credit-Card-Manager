import {  faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { generarClase, generarColCuota, calcularCuota, format } from "../helpers/funcHelper";
import { startDeleteProduct } from "../store/action/actionMes";

const MESES = [
    'ENERO', 'FEBRERO', 'MARZO',
    'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE',
    'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
]

export const Table = () => {
    
    const dispatch = useDispatch();

    const { listaMes } = useSelector( state => state.mes );
    
    const [subTotal, setSubtotal]             = useState( 0 );
    const [listaMesRender, setListaMesRender] = useState( [] );
    const [mesFiltro, setMesFiltro]           = useState( new Date().getMonth() );
    
    const initRender = () => {
        setSubtotal(0);

        if(!listaMes)
            return
      
        const mapped = listaMes
            .map( producto => {
                return {
                    ...producto, 
                    //cuotaNro: calcularCuotaManual(new Date(producto.DATE_MONTH_PURCHASE).getMonth(), mesFiltro, new Date(producto.DATE_MONTH_PURCHASE).getFullYear() )
                    cuotaNro: calcularCuota(producto, mesFiltro)        
                }
            })
            .filter( p => p.cuotaNro <= p.FEES );
        
        
        setListaMesRender( mapped );

        // Calculo del subtotal & total;
        let subTotalTemp = 0;
        let totalTemp = 0;
        for(let v of mapped){
            totalTemp += parseFloat(v.TOTAL);             
            if(v.FEES == v.cuotaNro) { // Necesario para que no sume al proximo mes la cuota que cancela finalmente una compra
                continue;
            }
            subTotalTemp += parseFloat(v.MONTH_PAY);
        }

        setSubtotal(subTotalTemp);
    }
    
    const onChangeMes = ( { target } ) => {
        const { value } = target;
        setMesFiltro(value);
    }
    
    const renderTable = ( d ) => (`
        <table class="table">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class='text-start'>
                <tr>
                    <td class=''>Fecha compra</td>
                    <td>${ format(d.PURCHASE_DATE).replace('T', ' ') }</td>
                </tr>
                <tr>
                    <td class=''>Cantidad Cuotas</td>
                    <td> ${ d.FEES } </td>
                </tr>
                <tr>
                    <td class=''>Total </td>
                    <td> $ ${ d.TOTAL} </td>
                </tr>
                <tr>
                    <td class=''>Total por cuota</td>
                    <td> $ ${ d.MONTH_PAY } </td>
                </tr>
            </tbody>
        </table>
    `);

    const callSwal = ( d ) => {
        Swal.fire({
            title: `<strong>${d.NAME}</strong>`,
            html: renderTable(d) ,
            showCloseButton: true,
            confirmButtonText: 'Aceptar'
          })
    }

    const onClickDelete = ( { ID_PRODUCT } ) => {
        Swal.fire({
            title: '¿ Estás de acuerdo ?',
            text: "Tu gasto se eliminará permanentemente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) 
                dispatch( startDeleteProduct( ID_PRODUCT ) );
          })
    }

    useEffect(initRender, [listaMes, mesFiltro] );

    return (
        <div className="p-5 container">
            <div className="col-md-3 mb-4">
                <span>Filtrar gasto por el mes de: </span>
                <select className="form-control" onChange={ onChangeMes }>
                    {
                        MESES.map( (m, i)  => <option defaultChecked={ mesFiltro }  key={ i } value={ i }> { m } </option> )
                    }
                </select>
            </div>
            <table className="table p-5">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Producto y descripción</th>
                        <th scope="col">Cuota</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listaMesRender.map( (d, i) => {
                            
                            return (
                                <tr className={ generarClase(d) } key={i}>

                                        <td className=""> 
                                            <button className="btn-non-style" 
                                                    onClick={ () => { onClickDelete(d) }} >
                                            <FontAwesomeIcon
                                                icon={ faCircleXmark } 
                                                style={{marginRight: '15px' ,color:'#dc3545', fontSize: '23px', background:'white', borderRadius: '100px', borderColor:'#dc3545'}}/>
                                                </button>
                                        </td>
                                        <td className="col-md-8"> { d.NAME } </td>
                                        <td className="col-md-1"> { generarColCuota(d) } </td>
                                        <td className="col-md-2">$ { d.MONTH_PAY }  </td>
                                        <th className="col-md-1">
                                            <button className="btn-non-style" onClick={ () => { callSwal(d) } }>
                                                <FontAwesomeIcon 
                                                    style={{marginRight: '15px', fontSize: '23px'}}
                                                    icon={faEye}/>
                                            </button>
                                        </th>
                                </tr>
                            )
                        }) 
                    }
                </tbody>
                <caption>
                    <div> Subtotal del prox. mes: <b>$ { subTotal }</b> </div>
                </caption>
                
            </table>
        </div>
    );
}