import { Routes, Route } from 'react-router'
import Header from './components/Header/Header.jsx' 
import Detail from './pages/Detail/Detail.jsx' 
import Home from './pages/Home/home.jsx'
import Favorite from './pages/Favorite/Favorite.jsx'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import ApiErrorPage from './pages/ErrorPage/ApiErrorPage.jsx'

function App() {
  return (
    <MainLayout >
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorite" element={<Favorite/>} />
        <Route path="/detail/error" element={<ErrorPage/>} />
        <Route path="/api-error" element={<ApiErrorPage/>} />
      </Routes>
    </MainLayout >
  )
}

export default App