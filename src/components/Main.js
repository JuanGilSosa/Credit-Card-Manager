import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import { fetchService } from "../services/fetchService";
import { startSetMonth } from "../store/action/actionMonth";
import { Manager } from "./Manajer";
import { History } from "./History";
import { useEffect, useState } from "react";
import { delLogin, setSessionUser } from "../store/action/actionUser";
import { Card } from "./CardComponent/Card";
import { CreditLimit } from "./CreditLimit";
import { setCard } from "../store/action/actionCard";

const styleLink = {
    color: 'white',
    textDecoration: 'none'
  }

export const Main = () => {
    const dispatch = useDispatch();

    const { userSession } = useSelector( state => state.user );
    
    useEffect(() => {
        fetchService(`/purchase/getbyuser?IdUser=${userSession.ID_USER}`)
            .then(res => {
                if (res.ok) {
                    dispatch(startSetMonth(res.data));
                    dispatch(setSessionUser(userSession));
                }
            });
        fetchService(`/card/getbyid?IdUser=${userSession.ID_USER}`, {}, 'GET')
            .then(res => {
                if(!res.ok)
                    console.warn('[Main.js:36 - Server] Error getting cards');

                dispatch( setCard( res.data ) );
            });
    }, []);

    const cerrarSesion = () => {
        dispatch(startSetMonth([]));
        dispatch(delLogin());
        dispatch(setCard([]));
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
                <div className="container-fluid">
                    <Link className='navbar-brand' style={styleLink} to='/main/manager'> {' C C M '}   </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" style={styleLink} to='main/manager'>Administrador</Link>
                            <Link className="nav-link" style={styleLink} to='main/history'>Historial</Link>
                            <Link className="nav-link" style={styleLink} to='main/cards'>Mis tarjetas</Link>
                            <Link className="nav-link" style={styleLink} to='main/limite'>Limite</Link>
                        </div>
                    </div>
                    <div className="d-flex">
                        <Link className="nav-link" style={styleLink} to='/' onClick={ cerrarSesion }>Cerrar sesi??n</Link>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route path='main/manager' element={ <Manager /> }/>
                <Route path='main/history' element={ <History /> }/>
                <Route path='main/cards' element={ <Card /> } />
                <Route path='main/limite' element={ <CreditLimit /> } />
            </Routes>
        </div>
    )
}