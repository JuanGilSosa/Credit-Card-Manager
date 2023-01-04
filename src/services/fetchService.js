const handleSuccess = ( res ) => res.json();
const handleError = ( msg ) => { 
    return { message: msg, ok: false } 
}

export const fetchService = (endpoint, data,  method='GET') => {
    const URL = 'http://localhost:3000/api' + endpoint;
    var res; 
    if(method === 'POST'){

    }else if( method === 'GET' ){
        res = fetch(URL);
    }

    return res.then(handleSuccess, handleError('Error al obtener informacion'));
}