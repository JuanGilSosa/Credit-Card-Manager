import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Main } from './components/Main';

function App() {
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/*' element={ <Main/> } /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
