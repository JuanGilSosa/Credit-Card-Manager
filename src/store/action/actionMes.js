export const startAddMes = (elemento) => {
    return async (dispatch) => {
        dispatch(addElemento(elemento));
    }
}

export const startGetMes = () => {
    return async (dispatch) => {
        dispatch(getElementos());
    }
}

export const startSetMes = ( data ) => {
    return async (dispatch) => {
        dispatch(setElementos(data));
    }
}

const addElemento = (elemento) => ({
    type: '@mes/add',
    payload: elemento
})

const getElementos = () => ({
    type: '@mes/getall'
})

const setElementos = ( elementos ) => ({
    type: '@mes/set',
    payload: elementos
})