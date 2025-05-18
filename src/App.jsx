import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import HomePage from './pages/home'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-right' />
        <Routes path="/*">
          <Route path='/login' element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path='/testing' element={<TestPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path='/*' element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
