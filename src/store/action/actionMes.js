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

const addElemento = (elemento) => ({
    type: '@mes/add',
    payload: elemento
})

const getElementos = () => ({
    type: '@mes/getall'
})