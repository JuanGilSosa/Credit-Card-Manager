import moment from "moment/moment";

export const calcularCuota = ( { DATE_MONTH_PURCHASE }, month = 0 ) => { 
    const fecha = new Date();  
    fecha.setMonth(month); // Seteamos el mes, que se obtendra desde el filtro select
    const now  = moment(fecha);
    const inf  = moment(DATE_MONTH_PURCHASE);
    const diff = now.diff(inf, 'month');
    return diff;
}

export const format = ( PURCHASE_DATE ) => moment(PURCHASE_DATE).utcOffset(0).format('DD/MM/YYYYTHH:mm');

    /**
     * @NOTE Esta función se encarga de verificar si las cuotas son 12, en ese caso, retornar un arreglo con un objeto {push} repetido que tenga cuota 12/12 asi se ve en el mes de compra
     * @param {Array} obj el objeto que se va a iterar  
    */
export const verificarCuotaAnio = ( obj ) => {
    let arrAux = Object.assign([], obj);
    for ( let d of obj ) {
        if( d.FEES == 12 ) {
            let auxObj = Object.assign({}, d);
            auxObj.cuotaNro = 12;
            arrAux.push(auxObj);
        }
    }
    return arrAux;
}

/**
 * 
 * @param {integer} mesCompra 
 * @param {integer} mesActual 
 * @returns Retorna la cantidad de cuotas en la que se encuentra desde que hizo la compra
 * @note Esto se hizo debido a que la funcion {calcularCuota} que usa moment, no calcula bien 
 */
export const calcularCuotaManual = ( mesCompra, mesActual, anioCompra ) => {

    let res = 2 * 10;
    
    const anioActual = new Date().getFullYear();

    const auxDateCompra = moment(new Date(anioCompra, mesCompra, 0));
    const auxDateActual = moment(new Date(anioActual, mesActual, 0));
    const diff = Math.abs( auxDateCompra.diff(auxDateActual, 'month') );

 
    // Simula fin compra .-
    if ( diff >= 12 ) 
      res = 2 * 10; // Este es un valor relativo, solo simboliza que 20 es mucho mayor que las cuotas que son 12 como maximo
    
      if(diff == 12)
      res = 12;
   
    if ( mesCompra < mesActual ) // Compre en Febrero y estoy en Mayo .- Cuota Nro°3 
      res = mesActual - mesCompra;      

    if ( mesCompra > mesActual  ) { // Compre en Noviembre y estoy en Enero .- Cuota Nro°2
      const a = (mesCompra - mesActual);
      res = 12 - a;
    } 

    if ( mesCompra == mesActual )  // también simula fin compra .-
      res = 0;
    
    
    return res;
  }
  

/**
* @NOTE Generadores de render para hacer mas legible el codigo
*/
export const generarNroCuota = (cuotaNro, FEES) => cuotaNro == 0 && FEES == 12 ? FEES : '-';
export const generarColDescripcion = ({ NAME, PURCHASE_DATE, FEES }) =>
  NAME + ` - ( Comprado el ${format(PURCHASE_DATE).replace('T', ' ') + ' )'} a ${FEES} cuota/s`;

export const generarColCuota = ({ cuotaNro, FEES }) =>
  (cuotaNro == 0) ? `${generarNroCuota(cuotaNro, FEES)} / ${FEES}` : `${cuotaNro} / ${FEES}`;

export const generarClase = ({
  FEES, cuotaNro,
}) => (FEES <= cuotaNro) ? 'my-bg-success' : ((FEES == 12 && cuotaNro == 0) ? 'my-bg-year' : (cuotaNro == 0 ? 'my-bg-primary' : ''))

