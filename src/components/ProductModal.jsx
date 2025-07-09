import { useEffect } from 'react'
import './ProductModal.css'

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="modal-body">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="modal-details">
            <h2 className="modal-title">{product.name}</h2>
            
            <div className="modal-section">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="modal-specifications">
              <div className="spec-item">
                <span className="spec-label">Available Types:</span>
                <span className="spec-value">{product.availableTypes}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Available Diameters:</span>
                <span className="spec-value">{product.availableDiameters}</span>
              </div>
              
              <div className="spec-item">
                <span className="spec-label">Flip Top:</span>
                <span className="spec-value">{product.flipTop}</span>
              </div>
            </div>

            <div className="modal-section">
              <h3>Applications</h3>
              <ul className="applications-list">
                {product.applications.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>Features</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
