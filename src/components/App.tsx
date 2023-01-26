
import styles from './App.module.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './authForm';
import { api } from '../services/authService';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../services/userSlice';
import { FileManager } from './fileManager';
import { Layout } from './layout';



function App() {
  
  api.useAuthRequestQuery()
  const isAuth = useSelector(selectIsAuthenticated)

  return (
    <BrowserRouter>
      <div className={styles.App}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {
            !isAuth ? 
            <>
              <Route path='/' element={<Navigate to="/signup " replace/>}/>
              <Route path='/signup' element={<AuthForm mode='create'/>}/>
              <Route path='/signin' element={<AuthForm mode='login'/>}/>
            </>
            :
            <>
            
              <Route path='/' element={<FileManager/>}/>
              <Route path='/signin' element={<Navigate to="/" replace/>}/>
              <Route path='/signup' element={<Navigate to="/" replace/>}/>
            </>
          }
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
