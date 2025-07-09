import { useState } from 'react'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Please provide your details along with your queries so we can get back to you with solutions
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Enter your message"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Inquiry
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h2>Contact</h2>
            <div className="info-item">
              <strong>Phone:</strong> +91-9825326475
            </div>
            <div className="info-item">
              <strong>Email:</strong> navkalaplasticindustries@gmail.com
            </div>
          </div>

          <div className="location-info">
            <h2>Location</h2>
            <div className="address">
              <p>17/A, Mahalaxmi Industrial Estate,</p>
              <p>Near Bombay Conductor,</p>
              <p>Vatva, Ahmedabad - 382445,</p>
              <p>Gujarat, India</p>
            </div>
          </div>

          <div className="map-placeholder">
            <div className="map-container">
              <span>Google Maps Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
