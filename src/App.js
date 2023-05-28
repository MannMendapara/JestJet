import './App.css';
import Signup from './components/Signup.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Fireauth from './components/Fireauth';
import Firebase from './components/Firebase';


function App() {
  return (
    <BrowserRouter> 
      <Firebase/>
      {/* <Fireauth/> */}
      {/* <Routes>
      <Route path='/login' Component={Login}/>
      <Route path='/signup' Component={Signup}/>
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
