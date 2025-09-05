import './App.css'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import Dashboard from './components/Dashboard'
import TelaLogin from './components/TelaLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Cidades from './components/Cidades'
import Empresas from './components/Empresas'
import Estados from './components/Estados'
import Nichos from './components/Nichos'
import TelaProspec from './components/TelaProspec'
import ProtectedLayout from './components/ProtectedLayout'

function App() {

  return (
    <>    
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TelaLogin/>}/>
            {/* Rotas Protegidas */}
            <Route  
              element={
                <ProtectedRoute>
                  <div className='app-grid'>
                      <ProtectedLayout />
                  </div>
                </ProtectedRoute>
              }            
            >            
              <Route path='/cidades' element={<Cidades />}/>
              <Route path='/empresas' element={<Empresas />}/>
              <Route path='/estados' element={<Estados />}/>
              <Route path='/nichos' element={<Nichos />}/>
              <Route path='/tela-prospec' element={<TelaProspec />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
            </Route>
          </Routes>          
        </BrowserRouter>      
      </AuthProvider>    
    </>
  )
}

export default App
