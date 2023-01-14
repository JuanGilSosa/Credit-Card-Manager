import moment from "moment/moment";

export const calcularCuota = ( { DATE_MONTH_PURCHASE, FEES }, anio = 0, mes = 0, dia = 1) => { // mes = 0 = Enero

    const now  = moment(new Date(anio, mes, dia));
    const inf  = moment(DATE_MONTH_PURCHASE);
    const diff = now.diff(inf,'month');

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
