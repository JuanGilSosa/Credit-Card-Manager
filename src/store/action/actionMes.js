import Swal from "sweetalert2";
import { fetchService } from "../../services/fetchService";

export const startAddMes = (elemento) => {
    return dispatch => {
        fetchService('/purchase/add', elemento, 'POST')
            .then( res => {
                if(!res){
                    console.log("No pude guardarte la info :c");
                    return;
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El producto se agrego correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
                
                elemento.ID_PRODUCT = res.data.at(0).ID_PRODUCT;
                dispatch(addElemento(elemento));
            } );
    }
}

export const startDeleteProduct = ( ID_PRODUCT ) => {
    return dispatch => {
        const url = `/purchase/deletebyid?IdProduct=${ID_PRODUCT}`;
        fetchService(url, {}, 'DELETE')
            .then( res => {
                
                if (!res.ok)
                    return 
                
                dispatch( deleteElemento(ID_PRODUCT) );
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El elemento se borro correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }
}

export const startGetMes = () => {
    return async (dispatch) => {
        dispatch(getElementos());
    }
}

export const startSetMes = ( data ) => {
    return async (dispatch) => {
        dispatch(setElementos(data));
    }
}

const addElemento = (elemento) => ({
    type: '@mes/add',
    payload: elemento
})

const getElementos = () => ({
    type: '@mes/getall'
})

const setElementos = ( elementos ) => ({
    type: '@mes/set',
    payload: elementos
})

const deleteElemento = ( idElemento ) => ({
    type: '@mes/delete',
    payload: idElemento
})