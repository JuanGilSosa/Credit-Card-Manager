import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { startAddCard } from '../../store/action/actionCard';
import './CardStyle.css';
import { TheCard } from './TheCard';
import validator from 'validator';
import { validate } from '../../helpers/funcHelper';

export const Card = () => {

    const dispatch = useDispatch();

    const { userSession: u } = useSelector(state => state.user);
    const { listCard: c } = useSelector(state => state.card);

    const cardsOptions = [
        { label: "VISA", value: "VISA" },
        { label: "MASTER CARD", value: "MASTER CARD" },
        { label: "AMERICAN EXPRESS", value: "AMERICAN EXPRESS" },
        { label: "DISCOVER", value: "DISCOVER" },
        { label: "DINERS CLUB", value: "DINERS CLUB" },
        { label: "JCB", value: "JCB" },
        { label: "Otros", value: "Otros" },
    ];
    
    const [lastDigits, setLastDigits] = useState(null);
    const [cardType, setCardType] = useState(cardsOptions[0]);
    const [bankName, setBankname] = useState('');

    const submitForm = ( e ) => {

        e.preventDefault();

        const data = {
            BANK_NAME: bankName,
            LAST_DIGITS: parseInt(lastDigits),
            CARD_TYPE: cardType.value,
            ID_USER: u.ID_USER
        }
        
        Swal.fire({
            title: '¿ Desea agregar la tarjeta ?',
            showDenyButton: true,
            confirmButtonText: 'Si, guadar',
            denyButtonText: `No, mejor no`,
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(startAddCard(data));
            }
        })

        document.getElementById('formCard').reset();

    }

    const onChangeLastDigits = ( ev ) => { 
        setLastDigits(ev.target.value);
        //validate('int', validator, ev, setLastDigits);
    }
    const inputValidate = ( ev ) => {
        return !validator.isInt(ev.target.value); 
    }

    useEffect(() => {
        console.log('use effect card = ', c);
    }, [c]);

    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={submitForm} id="formCard">
                        <div className='row mt-5'>
                            <div className='col-sm-5 col-md-3 col-lg-6 mt-3'>
                                <label>Nombre del Banco</label>
                                <input className="form-control"
                                    type="text"
                                    onChange={(ev) => { setBankname(ev.target.value) }}
                                    maxLength="35"
                                    required />
                            </div>
                        </div>

                        <div className="row">
                            <div className='col-sm-5 col-md-3 col-lg-3 mt-3'>
                                <label>Ultimos 4 digitos</label>
                                <input className="form-control"
                                    type="text"
                                    maxLength={4}
                                    onKeyDown={ inputValidate }
                                    onChange={ onChangeLastDigits }
                                    required />
                            </div>
                            <div className='col-sm-5 col-md-3 col-lg-3 mt-3'>
                                <label>Tipo de tarjeta</label>
                                <Select
                                    isSearchable={false}
                                    options={cardsOptions}
                                    value={cardType}
                                    onChange={(data) => { setCardType(data) }}
                                />
                            </div>
                        </div>

                        <div className="mt-3 btn-block">
                            <button className="btn btn-success"
                                type="submit"
                            >
                                Agregar
                            </button>
                        </div>
                    </form>

                    <TheCard bankName={bankName} lastDigits={lastDigits} cardType={cardType.value} />

                    
                </div>
                
                
                
                <div className="col-lg-6">
                <h2>Mis tarjetas</h2>
                {
                    c.map(cMap => (
                        <TheCard key={cMap.ID_CARD} 
                                bankName={cMap.BANK_NAME}
                                lastDigits={cMap.LAST_DIGITS}
                                cardType={cMap.CARD_TYPE} />                    
                    ))
                }
                </div>
            </div>
        </div>

    )
}