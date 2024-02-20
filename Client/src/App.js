import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,BrowserRouter
} from "react-router-dom";
import Signup from './Component/Signup';
import Signin from './Component/Signin';
import Home from './Component/Home';

import Prac from "./Prac";
import Header from './Component/Header';

import History from './Component/LotteryHistory';

import Winner from './Component/Winner';
import AnnounceWinner from './Component/AnnounceWinner';
import LotteryScreen from './LotteryScreen';










function App() {
  return (

    <BrowserRouter>


   <Routes>
   <Route path="/header" element={<Header/>} />
   <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
      
          <Route path="/History" element={<History/>} />
          <Route path="/ChooseWinner" element={<Winner/>} />
          <Route path="/AnnounceWinner" element={<AnnounceWinner/>} />
          <Route path="/LotteryScreen" element={<LotteryScreen/>} />
           <Route path="/Prac" element={<Prac/>} />


   </Routes>
   
    </BrowserRouter>
  
    

 
  );
}

export default App;
