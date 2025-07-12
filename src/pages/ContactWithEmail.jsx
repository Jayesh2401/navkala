import { useState } from 'react'
import './Contact.css'

const ContactWithEmail = () => {
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

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    
    // Create email content
    const subject = `New Inquiry from ${formData.name} - Navkala Plastic Industries`
    const body = `Dear Navkala Team,

I am interested in your products and services. Please find my details below:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

Best regards,
${formData.name}`

    // Create mailto URL
    const mailtoURL = `mailto:navkalaplasticcaps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    window.location.href = mailtoURL
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
    
    alert('Thank you for your inquiry! Your email client will open to send the message.')
  }

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault()
    
    // Create WhatsApp message
    const whatsappMessage = `*New Inquiry from Website*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Message:* ${formData.message}

Thank you for contacting Navkala Plastic Industries!`

    // Your WhatsApp number
    const whatsappNumber = "919925325875"
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
    
    // Reset form
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

            <div className="submit-buttons">
              <button type="button" className="submit-btn whatsapp-btn" onClick={handleSubmitWhatsApp}>
                Send via WhatsApp
              </button>
              <button type="button" className="submit-btn email-btn" onClick={handleSubmitEmail}>
                Send via Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactWithEmail
