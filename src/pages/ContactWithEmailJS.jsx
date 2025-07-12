import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const ContactWithEmailJS = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitEmailJS = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // EmailJS configuration
      const serviceID = 'YOUR_SERVICE_ID' // Replace with your EmailJS service ID
      const templateID = 'YOUR_TEMPLATE_ID' // Replace with your EmailJS template ID
      const publicKey = 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'navkalaplasticcaps@gmail.com'
      }

      await emailjs.send(serviceID, templateID, templateParams, publicKey)
      
      alert('Thank you for your inquiry! We have received your message and will get back to you soon.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('EmailJS Error:', error)
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault()
    
    const whatsappMessage = `*New Inquiry from Website*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Message:* ${formData.message}

Thank you for contacting Navkala Plastic Industries!`

    const whatsappNumber = "919925325875"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    window.open(whatsappURL, '_blank')
    setFormData({ name: '', email: '', phone: '', message: '' })
    alert('Thank you for your inquiry! You will be redirected to WhatsApp to send your message.')
  }

  return (
    <div className="contact">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Please provide your details along with your queries so we can get back to you with solutions.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-section">
          <form className="contact-form">
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              ></textarea>
            </div>

            <div className="submit-buttons">
              <button 
                type="button" 
                className="submit-btn whatsapp-btn" 
                onClick={handleSubmitWhatsApp}
                disabled={isLoading}
              >
                Send via WhatsApp
              </button>
              <button 
                type="button" 
                className="submit-btn email-btn" 
                onClick={handleSubmitEmailJS}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send via Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactWithEmailJS
