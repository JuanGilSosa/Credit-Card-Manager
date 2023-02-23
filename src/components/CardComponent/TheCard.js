import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCcAmex, 
    faCcDinersClub, 
    faCcDiscover, 
    faCcJcb, 
    faCcMastercard, 
    faCcVisa 
} from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faRss } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Select from "react-select";

const cardStyle = {
    fontSize: "50px",
    marginRight: "10px",
}


export const TheCard = ( { key, bankName, lastDigits, cardType } ) => {

    const [card, setCard] = useState({
        id: key,
        bank: bankName,
        lDigits: lastDigits,
        cType: cardType
    });

    const cardTypes = {
         'VISA':             (<FontAwesomeIcon style={cardStyle} icon={faCcVisa} />       ),
         'MASTER CARD':      (<FontAwesomeIcon style={cardStyle} icon={faCcMastercard} /> ),
         'AMERICAN EXPRESS': (<FontAwesomeIcon style={cardStyle} icon={faCcAmex} />       ),
         'DISCOVER':         (<FontAwesomeIcon style={cardStyle} icon={faCcDiscover} />   ),
         'DINERS CLUB':      (<FontAwesomeIcon style={cardStyle} icon={faCcDinersClub} /> ),
         'JCB':              (<FontAwesomeIcon style={cardStyle} icon={faCcJcb} />        ),
         'Otros':            (<FontAwesomeIcon style={cardStyle} icon={faCreditCard} />   ) 
    };
    const getCardType = ( _cType, _cardSelected ) => {
        
        return _cType == _cardSelected
    }

    const renderSwal = () => (`
        <div>
            <div class="row">
                <div class="col-lg-12">
                    <input class="form-control" type="text" />
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <input class="form-control" type="number" />
                </div>
                <div class="col-lg-3">
                    <select class="form-control">
                        <option value="VISA" selected={${getCardType(cardType, 'VISA')}}> VISA </option>
                        <option value="MASTER CARD" selected={${getCardType(cardType, 'MASTER CARD')}}> MASTER CARD</option>
                        <option value="AMERICAN EXPRESS" selected={${getCardType(cardType, 'AMERICAN EXPRESS')}}> AMERICAN EXPRESS </option>
                        <option value="DISCOVER" selected={${getCardType(cardType, 'DISCOVER')}}> DISCOVER </option>
                        <option value="DINERS CLUB" selected={${getCardType(cardType, 'DINERS CLUB')}}> DINERS CLUB </option>
                        <option value="JCB" selected={${getCardType(cardType, 'JCB')}}> JCB </option>
                        <option value="Otros" selected={${getCardType(cardType, 'Otros')}}> Otros </option>
                    </select>
                </div>
            </div>
        </div>
    `);

    const onClickEditCard = () => {
        Swal.fire({
            title: `<strong>Mi Tarjeta</strong>`,
            html: renderSwal() ,
            showCloseButton: true,
            confirmButtonText: 'Aceptar'
          })
    }
    
    return (
        <div className="the-card" onClick={ onClickEditCard }>
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
                    { cardTypes[cardType] }
                </div>
            </div>
        </div>
    )
}