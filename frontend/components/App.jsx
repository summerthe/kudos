import ProtectedRoute from '@/components/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

const App = () => {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
