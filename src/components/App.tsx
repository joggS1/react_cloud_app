import React from 'react';
import { Navbar } from './navbar';
import styles from './App.module.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthForm } from './authForm';



function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<AuthForm mode='create'/>}/>
          <Route path='/signin' element={<AuthForm mode='login'/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
