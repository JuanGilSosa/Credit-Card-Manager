const initialState = {
    listCard: [],
    card: {},
}


export const cardReducer = (state  = initialState, action) => {
    switch (action.type){
        case '@card/add':
            console.log(state);
            return {
                ...state,
                listCard: Object.assign([], state.listCard).push(action.payload)
            };
        case '@card/setcards':
            return {
                ...state,
                listCard: action.payload
            }
        
        default:
            return state;
    }
}