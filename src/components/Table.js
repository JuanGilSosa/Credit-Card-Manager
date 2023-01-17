import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generarColDescripcion, generarClase, generarColCuota, calcularCuota } from "../helpers/funcHelper";

const MESES = [
    'ENERO', 'FEBRERO', 'MARZO',
    'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE',
    'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
]

export const Table = () => {
    
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
            <table className="table table-hover  p-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Producto y descripción</th>
                        <th scope="col">Cuota</th>
                        <th scope="col">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listaMesRender.map( (d, i) => {
                            
                            return (
                                <tr 
                                    className={ generarClase(d) } 
                                    key={i}>
                                        <th className="col-md-1">{ i + 1 } </th>
                                        <td className="col-md-8"> { generarColDescripcion(d) } </td>
                                        <td className="col-md-1"> { generarColCuota(d) } </td>
                                        <td className="col-md-2">$ { d.MONTH_PAY }  </td>
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