const initialState = {
    listaMes: []
}

export const mesReducer = (state = initialState, action) => {

    switch(action.type){
        case '@mes/getall':
            return { ...state, listaMes: state.listaMes }
        
        case '@mes/add':
            let list = Object.assign([], state.listaMes);
            list.push(action.payload);
            return { ...state, listaMes: list } 
        
        case '@mes/set':
            return {...state, listaMes: action.payload };

        case '@mes/delete':
            return { ...state, listaMes: state.listaMes.filter( d => d.ID_PRODUCT != action.payload ) }

        default: return state;
    }

}

