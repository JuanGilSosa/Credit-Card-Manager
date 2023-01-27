import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Register } from './components/Register';

function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/*' element={ <Main/> } />
        <Route path="/register" element={ <Register /> } /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
