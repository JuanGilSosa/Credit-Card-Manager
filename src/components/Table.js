import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Table = () => {
    
    const dispatch = useDispatch();

    const { listaMes } = useSelector( state => state.mes );

    const meses = [
        'Enero',   'Febrero',   'Marzo', 
        'Abril',   'Mayo',      'Junio', 
        'Julio',   'Agosto',    'Septiembre', 
        'Octubre', 'Noviembre', 'Diciembre'
    ]; const getMoth = () => meses.at(new Date().getMonth().valueOf());
    
    const [subTotal, setSubtotal] = useState( 0 );
    const [totalTarjeta, setTotalTarjeta] = useState( 0 );
    const [listaMesRender, setListaMesRender] = useState([]);
    const [mesElegido, setMesElegido] = useState(getMoth());
    

    const calcularCuota = ( { DATE_MONTH_PURCHASE }, anio = 0, mes = 0, dia = 1) => { // mes = 0 = Enero
        const now = moment(new Date(anio, mes, dia));
        const inf = moment(DATE_MONTH_PURCHASE);
        return now.diff(inf,'month');
    }

    const onClickTab = ( evt ) => {
        
        const { value } = evt.target;

        setMesElegido(value);
        setSubtotal(0);
        setTotalTarjeta(0);

        if(!listaMes)
            return
      
        const map = listaMes
            .filter( d =>  calcularCuota(d, new Date().getFullYear(), meses.indexOf(value)) <= d.FEES)
            .map( producto => {
                return {
                    ...producto, 
                    cuotaNro: calcularCuota(producto,  new Date().getFullYear(), meses.indexOf(value) )
                }
            });
        setListaMesRender(map);
        
        // Calculo del subtotal;
        let subTotalTemp = 0;
        let totalTemp = 0;
        for(let v of map){
            subTotalTemp += parseInt(v.MONTH_PAY);
            totalTemp += parseInt(v.TOTAL);             
        }
        setSubtotal(subTotalTemp);
        setTotalTarjeta(totalTemp);
    }
    
    const format = ( PURCHASE_DATE ) => moment(PURCHASE_DATE).utcOffset(0).format('DD/MM/YYYYTHH:mm');

    useEffect(() => {
        console.warn("RENDER....");
        onClickTab( { target:{ value:'Enero' }  } );
    }, [listaMes] );

    return (
        <div className="p-5">
            
            {/** TABS de nuestra tabla */}
            <div className="">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {
                        meses.map( m => { 
                            return  <li key={m} className="nav-item" role="presentation">
                                <button className="nav-link" value={m} type="button" onClick={onClickTab}>{m}</button>
                            </li>
                        } )
                    }
                </ul>
            </div>

            <h4 className="mt-3 mb-3">Viendo mes {mesElegido} </h4>
            <table className="table table-hover p-5">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cuota</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        listaMesRender.map( (d, i) => {
                            
                            return (
                                <tr className="" key={i}>
                                    <th className="col-md-1">{ i + 1} </th>
                                    <td className="col-md-1"> {(d.cuotaNro == 0) ? `- / ${d.FEES}` : `${d.cuotaNro} / ${d.FEES}` }  </td>
                                    <td className="col-md-8"> { d.NAME + ' -- Comprado el: ' + format(d.PURCHASE_DATE).replace('T', ' ')} </td>
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