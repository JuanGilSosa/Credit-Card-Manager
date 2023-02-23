import Swal from "sweetalert2";
import { fetchService } from "../../services/fetchService"

export const startAddCard = ( card ) => {
    return dispatch => {
        fetchService('/card/add', card, 'POST')
            .then(res => {
                if( res.ok ){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'La tarjeta se agrego correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    dispatch(addCard( card ));
                }
            })
    }
}

// export const startGetCards = ( idUser ) => {
//     return dispatch => {
//         const url = `/card/getbyid?IdUser=${idUser}`
//         fetchService(url, {}, 'GET')
//             .then(res => {
//                 if( res.ok ){
//                     Swal.fire({
//                         position: 'top-end',
//                         icon: 'success',
//                         title: 'La tarjeta se agrego correctamente',
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     dispatch(addCard( card ));
//                 }
//             })
//     }
// }

export const addCard = ( card ) => ({
    type: '@card/add',
    payload: card
});

export const setCard = ( listCard ) => ({
    type: '@card/setcards',
    payload: listCard
});