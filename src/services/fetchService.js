const handleSuccess = ( res ) => res.json();
const handleError = ( msg ) => { 
    return { message: msg, ok: false } 
}

export const fetchService = (endpoint, data,  method='GET') => {
    const URL = 'http://juanidev.sytes.net:3000/api' + endpoint;
    var res; 
    if(['POST','DELETE', 'PUT'].some(x => x === method)){
        res = fetch(URL, {
            method: method, 
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }else if( method === 'GET' ){
        res = fetch(URL);
    }

    return res.then(handleSuccess, handleError('Error en la petición'));
}