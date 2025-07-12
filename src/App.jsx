import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Container from './components/Container'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default App
