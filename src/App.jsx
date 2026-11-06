import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AppStateProvider from './context/AppStateProvider.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const HackathonDetail = lazy(() => import('./pages/HackathonDetail.jsx'))
const InfoPage = lazy(() => import('./pages/InfoPage.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/hackathons/:slug" element={<HackathonDetail />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStateProvider>
  )
}
