import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { generarColDescripcion, generarClase, calcularCuota } from "../helpers/funcHelper";

export const History = () => {

    const { listaMes } = useSelector( state => state.mes );
    const [listaToRender, setListaToRender] = useState( [] );

    const renderTotal = () => listaMes.reduce((acumulador, d) => acumulador + d.TOTAL, 0);
    
    useEffect( () => {
        setListaToRender(
            listaMes.map( p => {
                return {
                    ...p,
                    //cuotaNro: calcularCuotaManual( new Date(p.DATE_MONTH_PURCHASE).getMonth(), new Date().getMonth(), new Date(p.DATE_MONTH_PURCHASE).getFullYear() ) 
                    cuotaNro: calcularCuota(p, new Date().getMonth())
                }
            } )
        );
    }, [History]);

    return (
        
        <div className="p-5 container">
            <div>
                <span> Referencias: </span>
                <span className="badge rounded-pill text-bg-primary m-1"> Nueva compra</span>
                <span className="badge rounded-pill text-bg-success m-1"> Fin del pago </span>
                <span className="badge rounded-pill text-bg-light m-1" style={{'border': '1px solid black'}}> Pagos vigentes </span>
            </div>
            <table className="table table-hover  p-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Producto y descripción</th>
                        <th scope="col">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listaToRender.map( (d, i) => {
                            
                            return (
                                <tr className={ generarClase(d) } 
                                    key={i}>
                                        <th className="col-md-1">{ i + 1 } </th>
                                        <th className="col-md-10">{ generarColDescripcion(d) } </th>
                                        <td className="col-md-2">$ { d.TOTAL }  </td>
                                </tr>
                            )
                        }) 
                    }
                </tbody>
                <caption className="text-end">
                    <div> <b> TOTAL TARJETA: $ { renderTotal() } .- </b> </div>
                </caption>
                
            </table>
        </div>
    )
}