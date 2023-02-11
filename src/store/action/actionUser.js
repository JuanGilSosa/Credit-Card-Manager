import Swal from "sweetalert2";
import { enviarEmail, generarCodigo } from "../../helpers/funcHelper";
import { fetchService } from "../../services/fetchService";

export const setSessionUser = ( user ) => ({
    type: '@user/setlogin',
    payload: user
});

export const delLogin = (  ) => ({
    type: '@user/closesession'
});

export const setCode = ( code ) => ({
    type: '@user/setcode',
    payload: code
});

export const setLimit = ( creditLimit ) => ({
    type: '@user/setlimit',
    payload: creditLimit
})

export const startLogin = ( { username, pw } ) => {
    return (dispatch) => {
        const url = `/user/canlogin?username=${username}&password=${pw}`;
        fetchService(url, 'GET').then(res => {
            
            if(res.data.length == 0 ) return;

            dispatch( setSessionUser( res.data[0] ) );
        })
    }
}

export const startRegister = ( newUser ) => {
    return async (dispatch) => {

        // const code = generarCodigo();
        // dispatch( setCode( code ) );
        // enviarEmail(code, newUser.email);

        fetchService('/user/register', newUser, 'POST')
            .then( async (res) => {
                
                if (!res){ 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal!',
                      })
                    return;
                }

                Swal.fire(
                    'Perfecto!',
                    'Ahora ya podés logearte 😎',
                    'success'
                );
                
             } );
    }
}

export const startSetlimit = ( { IdUser, Limite } ) => {
    return dispatch  => {
        const url = `/user/setlimit?IdUser=${IdUser}&Limite=${Limite}`;
        fetchService(url, {}, 'PUT')
            .then( res => {
                if(!res){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Algo salió mal!',
                      })
                    return;
                }
                dispatch(setLimit(Limite));
                Swal.fire(
                    'Perfecto!',
                    'Ya tenes tu limite guardado, verifica tu saldo!!!',
                    'success'
                );     
            });
    }
}
