const initialState = {
    listCard: [],
    card: {},
}


export const cardReducer = (state  = initialState, action) => {
    switch (action.type){
        case '@card/add':
            return {
                ...state,
                listCard: Object.assign([], state.listCard).push(action.payload)
            };
        case '@card/setcards':
            return {
                ...state,
                listCard: action.payload
            }
        
        case '@card/update':
            const auxSt = Object.assign([], state.listCard);
            let index = auxSt.findIndex( l => l.ID_CARD == action.payload.ID_CARD );
            auxSt[index] = action.payload;
            return {
                ...state,
                listCard: auxSt
            }
        default:
            return state;
    }
}