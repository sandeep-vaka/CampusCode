import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppState } from '../context/appState.js'

// Mock guard: sends visitors without a (fake) session to /login and returns them afterwards.
export default function ProtectedRoute() {
  const { user } = useAppState()
  const location = useLocation()
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
