import React,{useState} from 'react';
//import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import { Router } from "@reach/router";
import Authentication from './components/Authentication';
import Otp from './components/Otp';
import CreateTeam from './components/CreateTeam/CreateTeam';
import Home from './components/Home/Home';
import Toss from './components/Toss';
import ScoreBoard from './components/ScoreBoard/ScoreBoard'

function App() {
 


  
  return (
    
    <div>
  <Router>
    
     <CreateTeam path="/create" />
     <Otp path="/mobile"/>
     <Home path="/home" />
     <Toss path="/toss"/>
     <ScoreBoard path="/score"/>
     <Authentication exact path="/"/>
    
  </Router>
    </div>
  );
}

export default App;
