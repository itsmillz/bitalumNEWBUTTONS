import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PrivateRoute from './router/PrivateRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import RouterGeneral from './router/routerGeneral'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login/login'
import Dashboard from './pages/dashboardAlumno/Dashboard'

const queryClient = new QueryClient();

function App() {


    return(
        <QueryClientProvider client={queryClient} >
          <AuthProvider>
                <BrowserRouter>
                    <Routes>
                       <Route path='/' element={<Login/>} />
                       <Route path='/login' element={<Login/>} />
                       <Route path='/dashboard' element={<Dashboard/>} />
                    </Routes>
                </BrowserRouter>
              </AuthProvider>
        </QueryClientProvider>
      )
 
   
}

export default App
