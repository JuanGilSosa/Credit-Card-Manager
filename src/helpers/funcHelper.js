import moment from "moment/moment";

export const calculateFee = ( { DATE_MONTH_PURCHASE }, month = 0, year = new Date().getFullYear() ) => { 

  const inf  = moment(DATE_MONTH_PURCHASE);

  const date = new Date();
  
  date.setUTCDate(2); // Tenemos en cuenta que en la bd se guarda un dos en DATE_MONTH_PURCHASE
  date.setMonth(month); // Seteamos el mes, que se obtendra desde el filtro select
  if(year != null)
    date.setFullYear(year);

  const now          = moment(date);
  const diffInfDays  = now.diff(inf, 'days');
  let diffInMonths   = now.diff(inf, 'month');
  /**
   * @note Si los dias son menores retornamos menos uno, quiere decir que la fecha es mayor a la cargada, no retornes ninguna diferencia
   * @returns {-1} para que no haga display de la fila con datos y le ponga la clase d-none func:generarClase
   */
  if(diffInfDays < 0)
    return -1;

  // para que se muestre en el historial los datos completos, ya que year envia
  if (year === null && diffInfDays < 0)
    diffInMonths = 0;

  return diffInMonths;
}

export const format = ( PURCHASE_DATE ) => moment(PURCHASE_DATE).utc().format('DD/MM/YYYY HH:mm');

/**
  * @NOTE Esta función se encarga de verificar si las cuotas son 12, en ese caso, retornar un arreglo con un objeto {push} repetido que tenga cuota 12/12 asi se ve en el mes de compra
  * @param {Array} obj el objeto que se va a iterar  
*/
export const checkFeePerYear = ( obj ) => {
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
 * @param {integer} monthPurchase 
 * @param {integer} currentMonth 
 * @returns Retorna la cantidad de cuotas en la que se encuentra desde que hizo la compra
 * @note Esto se hizo debido a que la funcion {calcularCuota} que usa moment, no calcula bien 
 */
export const calclulateFeesManual = ( monthPurchase, currentMonth, yearPurchase ) => {

    let res = 2 * 10;
    
    const anioActual = new Date().getFullYear();

    const auxDateCompra = moment(new Date(yearPurchase, monthPurchase, 0));
    const auxDateActual = moment(new Date(anioActual, currentMonth, 0));
    const diff = Math.abs( auxDateCompra.diff(auxDateActual, 'month') );

 
    // Simula fin compra .-
    if ( diff >= 12 ) 
      res = 2 * 10; // Este es un valor relativo, solo simboliza que 20 es mucho mayor que las cuotas que son 12 como maximo
    
      if(diff == 12)
      res = 12;
   
    if ( monthPurchase < currentMonth ) // Compre en Febrero y estoy en Mayo .- Cuota Nro°3 
      res = currentMonth - monthPurchase;      

    if ( monthPurchase > currentMonth  ) { // Compre en Noviembre y estoy en Enero .- Cuota Nro°2
      const a = (monthPurchase - currentMonth);
      res = 12 - a;
    } 

    if ( monthPurchase == currentMonth )  // también simula fin compra .-
      res = 0;
    
    
    return res;
  }
  

/**
* @NOTE Generadores de render para hacer mas legible el codigo
*/

export const generarNroCuota = (cuotaNro, FEES) => cuotaNro == 0 && FEES == 12 ? FEES : '-';

export const generateColDescrptionLastYear = ({ NAME, PURCHASE_DATE }) => {
  const info = NAME + (moment(PURCHASE_DATE).year() < moment().year() ? ` (${moment(PURCHASE_DATE).year()})` : '');
  return info;
}

export const generateColDescription = ({ 
  NAME, PURCHASE_DATE, FEES 
}) => NAME + ` - ( Comprado el ${format(PURCHASE_DATE).replace('T', ' ') + ' )'} a ${FEES} cuota/s`;

export const generateColFees = ({ 
  cuotaNro, FEES 
}) => (cuotaNro == 0) ? `${generarNroCuota(cuotaNro, FEES)} / ${FEES}` : `${cuotaNro} / ${FEES}`;

export const generateClass = ({
  FEES, cuotaNro
}) => (FEES <= cuotaNro) ? 'my-bg-success' : ((FEES == 12 && cuotaNro == 0) ? 'my-bg-year' : ( cuotaNro < 0 ) ? 'd-none'  : (cuotaNro == 0  ? 'my-bg-primary' : ''))

export const validateEmail = email => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))

/**
 * @description Genera un codigo de 4 digitos para enviar por email y luego validar el registro del usuario
 * @returns Un codigo en formato string
 */
export const generateCode = () => {
  const n1 = Math.floor(Math.random() * 99);
  const n2 = Math.floor(Math.random() * 99);

  if( n1.toString().length == 1 ) n2+='1';
  if( n2.toString().length == 1 ) n2+='1';

  return n2.toString() + n1;
}

export const sendEmail = ( code, email ) => {
  var sLink = "mailto:" + email
			 + "?subject=" + "Código de verificación ! "
			 + "&body=" + 'Tu código de verificación es: ' + code;
             
  window.location.href = sLink;
}