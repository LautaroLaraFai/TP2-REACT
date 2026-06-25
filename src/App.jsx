import { Routes, Route, Outlet } from 'react-router'
import Header from './components/Header/Header.jsx' 
import Detail from './pages/Detail/Detail.jsx' 
import Home from './pages/Home/home.jsx'
import Favorite from './pages/Favorite/Favorite.jsx'
import './App.css'
import MainLayout from './layouts/MainLayout.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import ApiErrorPage from './pages/ErrorPage/ApiErrorPage.jsx'
import PublicRoute from './routes/PublicRoute.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'
import { useAuth } from './context/AuthContext.jsx'

function App() {

  const { loading } = useAuth();
  if (loading) return null;

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorite" element={
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
          }
        />
        <Route path="/detail/error" element={<ErrorPage />} />
        <Route path="/api-error" element={<ApiErrorPage />} />
      </Route>

      <Route element={<MainLayout showHeader={false} />}>
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
          } 
        />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App