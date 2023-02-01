import { faCircleXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { generateClass, generateColFees, format, generateColDescrptionLastYear, calculateFee } from "../helpers/funcHelper";
import { startDeleteProduct } from "../store/action/actionMonth";

const DATE = new Date();

const MESES = [
    { value: 0, label: 'ENERO'      },
    { value: 1, label: 'FEBRERO'    },
    { value: 2, label: 'MARZO'      },
    { value: 3, label: 'ABRIL'      },
    { value: 4, label: 'MAYO'       },
    { value: 5, label: 'JUNIO'      },
    { value: 6, label: 'JULIO'      },
    { value: 7, label: 'AGOSTO'     },
    { value: 8, label: 'SEPTIEMBRE' },
    { value: 9, label: 'OCTUBRE'    },
    { value: 10, label: 'NOVIEMBRE'  },
    { value: 11, label: 'DICIEMBRE' }
];

const ANIO = [ 
    { value: DATE.getFullYear()-1, label: (DATE.getFullYear()-1).toString() },
    { value: DATE.getFullYear(),   label: DATE.getFullYear().toString()     },
    { value: DATE.getFullYear()+1, label: (DATE.getFullYear()+1).toString() },
];



export const Table = () => {
    
    const dispatch = useDispatch();

    const { listaMes } = useSelector( state => state.mes );
    
    const [subTotal, setSubtotal]             = useState( 0 );
    const [listaMesRender, setListaMesRender] = useState( [] );
    const [mesFiltro, setMesFiltro]           = useState( MESES.find( m => m.value == DATE.getMonth() ) );
    const [anioFiltro, setAnioFiltro]         = useState( ANIO.find( a => a.value ==  DATE.getFullYear() ) );

    const initRender = () => {
        setSubtotal(0);
        
        if(!listaMes)
            return
      
        const mapped = listaMes
            .map( producto => {
                return {
                    ...producto, 
                    cuotaNro: calculateFee(producto, mesFiltro.value, anioFiltro.value)        
                }
            })
            .filter( p => p.cuotaNro <= p.FEES );
        
        
        setListaMesRender( mapped );

        // Calculo del subtotal & total;
        let subTotalTemp = 0;
        let totalTemp = 0;
        for(let v of mapped){

            totalTemp += parseFloat(v.TOTAL);             
            if(v.FEES == v.cuotaNro || v.cuotaNro < 0) { // Necesario para que no sume al proximo mes la cuota que cancela finalmente una compra
                continue;
            }
            subTotalTemp += parseFloat(v.MONTH_PAY);
        }

        setSubtotal(subTotalTemp);
    }
    
    const onChangeMes  = data => { setMesFiltro(data); }
    const onChangeAnio = data => { setAnioFiltro(data); }

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

    useEffect(initRender, [listaMes, mesFiltro, anioFiltro] );

    return (
        <div className="p-5 container">
            <div className="row">
                <h5>Ver registros por</h5>
                <div className="col-md-3 mb-4">
                    <span>Mes de: </span>
                    <Select options={MESES}
                            value={mesFiltro}
                            onChange={ onChangeMes }/>
                </div>
                <div className="col-md-3 mb-4">
                    <span>El Año: </span>
                    <Select options={ANIO}
                            value={anioFiltro}
                            onChange={ onChangeAnio }/>
                </div>
            </div>
            <table className="table p-5">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Producto</th>
                        <th scope="col">Cuota</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listaMesRender.map( (d, i) => {
                            
                            return (
                                <tr className={ generateClass(d) } key={i}>

                                        <td className=""> 
                                            <button className="btn-non-style" 
                                                    onClick={ () => { onClickDelete(d) }} >
                                            <FontAwesomeIcon
                                                icon={ faCircleXmark } 
                                                style={{marginRight: '15px' ,color:'#dc3545', fontSize: '23px', background:'white', borderRadius: '100px', borderColor:'#dc3545'}}/>
                                                </button>
                                        </td>
                                        <td className="col-md-8"> { generateColDescrptionLastYear(d) } </td>
                                        <td className="col-md-1"> { generateColFees(d) } </td>
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
                    <div> Subtotal del prox. mes: <b>$ { subTotal.toFixed(2) }</b> </div>
                </caption>
                
            </table>
        </div>
    );
}