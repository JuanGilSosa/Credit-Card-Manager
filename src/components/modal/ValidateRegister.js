import { useState } from "react";
import { useSelector } from "react-redux"
import { generateCode } from "../../helpers/funcHelper";

export const ValidateRegisterModal = () => {

    const { code } = useSelector( state => state.user ); 

    const [codigo, setCodigo] = useState('');
    
    const onClickReenviar = () => {
        const newCode = generateCode();
        console.log(newCode);
    }
    
    const onChangeCodigo = ( { target } ) => {
        const { value } = target;

        setCodigo(value);

    }

    const onClickValidando = () => {
        if( codigo == '1234' ){
            console.log(code);
        }
    }

    return (
        <div className="modal fade" id="ModalValidateRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            ¿ Aún no llega ?
                            <button className="btn btn-sm btn-secondary ms-4" onClick={ onClickReenviar }>Reenviar código</button>
                         </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Ingrese el codigo . . ." onChange={ onChangeCodigo }/>
                        <button className="btn btn-success" type="button" onClick={ onClickValidando }> Validar!</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}