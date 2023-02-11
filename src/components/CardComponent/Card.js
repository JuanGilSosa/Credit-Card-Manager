import { useState } from 'react';
import Select from 'react-select';
import './CardStyle.css';

export const Card = () => {

    const [lastDigits, setLastDigits] = useState(0);
    const [type, setType]             = useState({});

    const cardsOptions = [
        {label: "VISA", value: "VISA"}, 
        {label: "MASTER CARD", value:"MASTER CARD"}
    ];

    const onClickAdd = () => {

    }

    return (
        <div className="container mt-5">
            
            {/* <button className="btn-non-style btn-card p-4 fs-5">
                Agregar nueva tarjeta
            </button> */}
            
            <div className='row mt-5'>
                <div className='col-sm-5 col-md-3 col-lg-2 mt-3'>
                    <label>Ultimos 4 digitos</label>
                    <input className="form-control" type="number"/>
                </div>
                <div className='col-sm-5 col-md-3 col-lg-2 mt-3'>
                    <label>Tipo de tarjeta</label>
                    <Select options={cardsOptions}/>
                </div>
            </div>

            <div className='mt-3'>
                <button className='btn btn-success' onClick={onClickAdd}>Agregar</button>
            </div>

        </div>
    )
}