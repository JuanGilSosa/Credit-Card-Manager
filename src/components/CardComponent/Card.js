import { faCcAmex, faCcDinersClub, faCcDiscover, faCcJcb, faCcMastercard, faCcVisa, faSquareSteam } from '@fortawesome/free-brands-svg-icons';
import { faAmericanSignLanguageInterpreting, faCreditCard, faHouseSignal, faMarsStrokeUp, faRss, faRssSquare, faSignal, faSignal5, faSquareRss, faStream, faTimesRectangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import './CardStyle.css';

const cardStyle = {
    fontSize: "50px",
    marginRight: "10px",
}

export const Card = () => {

    const dispatch = useDispatch();

    const cardTypes = [
        (<FontAwesomeIcon style={cardStyle} icon={faCcVisa} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCcMastercard} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCcAmex} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCcDiscover} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCcDinersClub} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCcJcb} />),
        (<FontAwesomeIcon style={cardStyle} icon={faCreditCard} />)
    ];

    const cardsOptions = [
        { label: "VISA", value: "VISA", font: (cardTypes[0]) },
        { label: "MASTER CARD", value: "MASTER CARD", font: (cardTypes[1]) },
        { label: "AMERICAN EXPRESS", value: "AMERICAN EXPRESS", font: (cardTypes[2]) },
        { label: "DISCOVER", value: "DISCOVER", font: (cardTypes[3]) },
        { label: "DINERS CLUB", value: "DINERS CLUB", font: (cardTypes[4]) },
        { label: "JCB", value: "JCB", font: (cardTypes[5]) },
        { label: "Otros", value: "Otros", font: (cardTypes[6]) },
    ];

    const [lastDigits, setLastDigits] = useState(null);
    const [cardType, setCardType] = useState(cardsOptions[0]);
    const [bankName, setBankname] = useState('');



    const onClickAdd = () => {

    }

    return (
        <div className="container mt-5">

            {/* <div className="row">
                <button className="col-lg-6 btn-non-style btn-card p-4 fs-5">
                    Agregar nueva tarjeta
                </button>
            </div> */}
            <div className='row mt-5'>
                <div className='col-sm-5 col-md-3 col-lg-4 mt-3'>
                    <label>Nombre del Banco</label>
                    <input className="form-control"
                        type="text"
                        onChange={(ev) => { setBankname(ev.target.value) }}
                        maxLength="35" />
                </div>

            </div>

            <div className="row">
                <div className='col-sm-5 col-md-3 col-lg-2 mt-3'>
                    <label>Ultimos 4 digitos</label>
                    <input className="form-control" type="number" onChange={(ev) => { setLastDigits(ev.target.value) }} />
                </div>
                <div className='col-sm-5 col-md-3 col-lg-2 mt-3'>
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
                <button className='btn btn-success' onClick={onClickAdd}>Agregar</button>
            </div>

            <div className="the-card">
                <div className="row">
                    <div className="col-lg-12 title-card mt-3 ms-3">
                        &nbsp;
                        {bankName || '[nombre del banco]'}
                    </div>

                    <div>&nbsp;</div>

                    <div className="ms-3"><FontAwesomeIcon icon={faRss} style={{ fontSize: '22px', transform: 'rotate(45deg)' }} /> </div>

                    <div className="col-lg-12 mt-3" style={{ marginBottom: '-10px' }}>
                        <p className="font-halter ms-4">
                            XXXX XXXX XXXX {lastDigits || '0000'}
                        </p>
                    </div>

                    <div className="text-end">
                        {cardType.font}
                    </div>
                </div>
            </div>

        </div>
    )
}