import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Container from './components/Container'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/*" element={
            <>
              <Header />
              <Container>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Container>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
