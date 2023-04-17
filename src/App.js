import './App.css';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import { useState } from 'react';
import Alerts from './components/Alerts';



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert ({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Alerts alert={alert}/>
      <Routes>
        <Route exact path='/' element={ <Layout/> }/>
        <Route exact path='/about' element={ <About/>} />
        <Route exact path='/login' element={ <Login showAlert={showAlert}/>} />
        <Route exact path='/register' element={ <Register showAlert={showAlert}/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App; 