import './App.css';
import { Main } from './components/Main';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { History } from './components/History';
import { Manager } from './components/Manajer';
import { Login } from './components/Login';

const styleLink = {
  color: 'white',
  textDecoration: 'none'
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <Link className='navbar-brand' style={ styleLink } to='/'>Menu</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" style={ styleLink } to='/manager'>Administrador</Link>
              <Link className="nav-link" style={ styleLink } to='/history'>Historial</Link> 
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={ <Main /> }/>
        <Route path='/manager' element={ <Manager /> }/>
        <Route path='/history' element={ <History /> }/>
      </Routes>
      {/* <Login /> */}
    </BrowserRouter>
  );
}

export default App;
