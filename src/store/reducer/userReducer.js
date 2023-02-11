
const initialState = {
    code: '',
    userSession: {
        ID_USER: 0,
        USERNAME: '',
        PW: '',
        EMAIL: '',
        NAME: '',
        SURNAME: '',
        CREDIT_LIMIT: 0,
    }
}

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case '@user/setlogin':
            return { ...state, userSession: action.payload }
        case '@user/closesession': 
            return initialState;
        case '@user/setcode':
            return { ...state, code: action.payload }
        case '@user/setlimit':
            return { 
                ...state, 
                userSession: { 
                    ...state.userSession, 
                    CREDIT_LIMIT: parseInt(action.payload) 
                }
            }
        default: 
            return initialState;
    }
}