const initialState = {
    listaMes: [
        // {
        //     'producto': 'Olla',
        //     'total': 15000,
        //     'cuotas': 3,
        //     'pagoMes':  15000 / 3,
        //     'fechaCompra': '2022-11-12T23:59',
        //     'fechaMesCompra': '2022-11-01T00:00' // Fecha mes compra es para calcular la cuota ni bien entra el mes actual
        // }, {
        //     'producto': 'Heladera',
        //     'total': 132000,
        //     'cuotas': 12,
        //     'pagoMes':  132000 / 12,
        //     'fechaCompra': '2022-10-05T18:00',
        //     'fechaMesCompra': '2022-10-01T00:00'
        // }, {
        //     'producto': 'Notebook',
        //     'total': 80000,
        //     'cuotas': 6,
        //     'pagoMes':  (80000 / 6).toFixed(2),
        //     'fechaCompra': '2022-01-23T07:00',
        //     'fechaMesCompra': '2022-01-01T00:00'
        // }, {
        //     'producto': 'Sandalias',
        //     'total': 7500,
        //     'cuotas': 3,
        //     'pagoMes':  7500 / 3,
        //     'fechaCompra': '2022-12-06T18:30',
        //     'fechaMesCompra': '2022-12-01T00:00'
        // },
    ]
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

        default: return state;
    }

}

