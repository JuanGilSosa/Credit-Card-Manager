import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calcularCuota, format, calcularCuotaManual } from "../helpers/funcHelper";

// Global 
const MESES = [
    'Enero',   'Febrero',   'Marzo', 
    'Abril',   'Mayo',      'Junio', 
    'Julio',   'Agosto',    'Septiembre', 
    'Octubre', 'Noviembre', 'Diciembre'
];

export const Table = () => {
    
    const { listaMes } = useSelector( state => state.mes );

    // Obtengo el mes de ahora
    const getMoth = () => MESES.at( new Date().getMonth().valueOf() );
    
    const [subTotal, setSubtotal]             = useState( 0 );
    const [totalTarjeta, setTotalTarjeta]     = useState( 0 );
    const [listaMesRender, setListaMesRender] = useState( [] );
    
    const initRender = () => {
        
        setSubtotal(0);
        setTotalTarjeta(0);

        if(!listaMes)
            return
      
        // Luego mapeo el objeto con la cuota nro en la que se encuentra el mes actual
        console.log(new Date().getMonth())
        const mapped = listaMes
        .filter( p => calcularCuotaManual(new Date(p.DATE_MONTH_PURCHASE).getMonth(), 1) <= p.FEES )
        .map( producto => {
            return {
                ...producto, 
                cuotaNro: calcularCuotaManual(new Date(producto.DATE_MONTH_PURCHASE).getMonth(), new Date().getMonth() )
            }
        });
        
        setListaMesRender( mapped );
        
        // Calculo del subtotal & total;
        let subTotalTemp = 0;
        let totalTemp = 0;
        for(let v of mapped){
            totalTemp += parseInt(v.TOTAL);             
            if(v.FEES == v.cuotaNro) { // Necesario para que no sume al proximo mes la cuota que cancela finalmente una compra
                console.log(v);
                continue;
            }
            subTotalTemp += parseFloat(v.MONTH_PAY);
        }
        setSubtotal(subTotalTemp);
        setTotalTarjeta(totalTemp);
    }
    
    /**
     * @NOTE Generadores de render para hacer mas legible el codigo
     */
    const generarNroCuota = ( cuotaNro, FEES ) => cuotaNro == 0 && FEES == 12 ? FEES : '-';

    const generarColDescripcion = ( { NAME, PURCHASE_DATE, FEES  } ) => 
        NAME + ` - ( Comprado el ${format(PURCHASE_DATE).replace('T', ' ') + ' )'} a ${FEES} cuota/s`;

    const generarColCuota = ( { cuotaNro, FEES } ) => 
        (cuotaNro == 0) ? `${ generarNroCuota( cuotaNro, FEES ) } / ${FEES}` : `${cuotaNro} / ${FEES}`;

    const generarClase = ( {
        FEES, cuotaNro,
    } ) => (FEES == cuotaNro) ? 'my-table-success' : ( (FEES == 12 && cuotaNro == 0) ? 'my-table-year' : (cuotaNro == 0 ? 'my-table-primary' : ''))

    // ./ Generadores de render


    useEffect(initRender, [listaMes] );

    return (
        <div className="p-5 container">

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
                                    className={  generarClase(d) } 
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
                    <div> <b> TOTAL TARJETA: $ { totalTarjeta } .- </b> </div>
                </caption>
                
            </table>
        </div>
    );
}