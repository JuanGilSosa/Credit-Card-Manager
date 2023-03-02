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
import { fetchService } from '../../services/fetchService';
import { useDispatch } from 'react-redux';
import { startUpdateCard } from '../../store/action/actionCard';

const cardStyle = {
    fontSize: "50px",
    marginRight: "10px",
}


export const TheCard = ( { idCard, bankName, lastDigits, cardType } ) => {

    const dispatch = useDispatch();

    const [card, setCard] = useState({
        id: idCard,
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
    
    const renderSwal = () => {
        return (`
        <div class="row text-start col-12">
            <div class="col-lg-12 px-4 pt-3">
                <span class="fs-6">Tarjeta de: </span>
                <input id="idCardBankname" value=${card.bank} class="form-control form-control-sm" type="text" />
            </div>
        </div>
        <div class="row text-start col-12">
            <div class="col-lg-6 px-4 pt-3">
                <span class="fs-6">Digitos de la tarjeta: </span>
                <input id="lastDigitsBank" value="${card.lDigits}" class="form-control form-control-sm" type="number" />
            </div>
            <div class="col-lg-6 px-4 pt-3 pb-3">
                <span class="fs-6">Tipo de tarjeta: </span>
                <select id="typeCardBank" class="form-control form-control-sm">
                    <option value="VISA" selected=`+ getCardType(cardType, 'VISA')+`> VISA </option>
                    <option value="MASTER CARD" selected=` + getCardType(cardType, 'MASTER CARD') + `> MASTER CARD</option>
                    <option value="AMERICAN EXPRESS" selected=` + getCardType(cardType, 'AMERICAN EXPRESS') + `> AMERICAN EXPRESS </option>
                    <option value="DISCOVER" selected=` + getCardType(cardType, 'DISCOVER') + `> DISCOVER </option>
                    <option value="DINERS CLUB" selected=` + getCardType(cardType, 'DINERS CLUB') + `> DINERS CLUB </option>
                    <option value="JCB" selected=` + getCardType(cardType, 'JCB') + `> JCB </option>
                    <option value="Otros" selected=` + getCardType(cardType, 'Otros') + `> Otros </option>
                </select>
            </div>
        </div>
        `)
    }

    const onClickEditCard = async () => {
        
        if(card.id === undefined)
            return;

        const { value: valuesCard } = await Swal.fire({
            title: `<strong>Mi Tarjeta</strong>`,
            html: renderSwal() ,
            showCloseButton: true,
            confirmButtonText: 'Guardar',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                return [
                    document.getElementById('idCardBankname').value,
                    document.getElementById('lastDigitsBank').value,
                    document.getElementById('typeCardBank').value
                ];
            }
        });

        if(valuesCard === undefined) 
            return;
        
        const cardPut = {
            ID_CARD:     idCard,
            BANK_NAME:   valuesCard[0],
            LAST_DIGITS: valuesCard[1],
            CARD_TYPE:   valuesCard[2],
        }

        dispatch( startUpdateCard( cardPut ) );

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


