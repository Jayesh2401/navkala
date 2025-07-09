import { useState } from 'react'
import './Header.css'
import logo from '../assets/images/logo.png'

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'contact', label: 'Contact', icon: '📞' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img src={logo} alt="Navkala Plastic Industries" className="logo-img" />
          {/* <div className="logo-text">
            <h1>NAVKALA</h1>
            <span>PLASTIC INDUSTRIES</span>
          </div> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
