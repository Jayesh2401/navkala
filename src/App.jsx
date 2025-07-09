import { useState } from 'react'
import Header from './components/Header'
import Container from './components/Container'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />
      case 'products':
        return <Products />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Container>
        {renderPage()}
      </Container>
      <Footer />
    </div>
  )
}

export default App
