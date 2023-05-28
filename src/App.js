import './App.css';
import Signup from './components/Signup.jsx'
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';


function App() {
  return (
    <BrowserRouter>
      <Signup/>
      <Login/>
    </BrowserRouter>
  );
}

export default App;
