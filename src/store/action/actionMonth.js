import moment from "moment";
import Swal from "sweetalert2";
import { fetchService } from "../../services/fetchService";

export const startAddMonth = (product) => {
    return dispatch => {
        fetchService('/purchase/add', product, 'POST')
            .then( res => {

                if(!res){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Algo salió mal en el servidor!',
                    });
                    return;
                }

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'El producto se agrego correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });

                product.DATE_MONTH_PURCHASE = moment(product.DATE_MONTH_PURCHASE).format('YYYY-MM-DDTHH:mm:00.000[Z]'); // Refactorizo, porque sino no guarda en BD
                product.ID_PRODUCT = res.data.at(0).ID_PRODUCT;
                dispatch(addProduct(product));
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
                
                dispatch( deleteProduct(ID_PRODUCT) );
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

export const startGetMonth = () => {
    return async (dispatch) => {
        dispatch(getProduct());
    }
}

export const startSetMonth = ( data ) => {
    return async (dispatch) => {
        dispatch(setProducts(data));
    }
}

const addProduct = (product) => ({
    type: '@mes/add',
    payload: product
})

const getProduct = () => ({
    type: '@mes/getall'
})

const setProducts = ( products ) => ({
    type: '@mes/set',
    payload: products
})

const deleteProduct = ( idProduct ) => ({
    type: '@mes/delete',
    payload: idProduct
})