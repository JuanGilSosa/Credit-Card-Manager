import { fetchService } from "../../services/fetchService";

export const setSessionUser = ( user ) => ({
    type: '@user/setlogin',
    payload: user
});

export const getUserSession = (  ) => ({
    type: '@user/getsession'
});

export const delLogin = (  ) => ({
    type: '@user/closesession'
});

export const startLogin = ( user ) => {
    return async (dispatch) => {
        const url = `/user/canlogin?username=${user.username}&password=${user.pw}`;
        const res = await fetchService(url, 'GET');
        
        if(!res.ok) 
            return;
            
        if(res.data.length <= 0) 
            return;
                
        dispatch( setSessionUser( res.data[0] ) );

    }
}
