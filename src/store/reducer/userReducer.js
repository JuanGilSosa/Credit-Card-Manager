
const initialState = {
    userSession: {
        ID_USER: 0,
        USERNAME: '',
        PW: '',
        EMAIL: '',
        NAME: '',
        SURNAME: ''
    }
    
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case '@user/setlogin':
            return { ...state, userSession: action.payload }
        case '@user/closesession': 
            return initialState;
        case '@user/getsession':
            return { ...state }
        default: 
            return initialState;
    }
}