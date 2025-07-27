import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import logo from '../assets/images/logo.png'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { id: 'home', label: 'Home', icon: '', path: '/' },
    { id: 'products', label: 'Products', icon: '', path: '/products' },
    { id: 'contact', label: 'Contact', icon: '', path: '/contact' }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
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
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
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
            <Link
              key={item.id}
              to={item.path}
              className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={handleNavClick}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
