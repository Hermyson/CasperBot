import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';


export default function AppRoutes() {
    
   
    
  
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Login/> } />
                <Route path="/Dashboard" element={< Dashboard/>} />                
            </Routes>
        </BrowserRouter>
    )
}