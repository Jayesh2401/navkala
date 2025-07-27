import { useEffect } from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-body">
          <h2 className="modal-title">{product.name}</h2>
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="modal-details">
            <div className="modal-section">
              <h3>Description</h3>
              <div className="description-table">
                {/* Show only custom fields - all labels are dynamic */}
                {product.customFields && product.customFields.length > 0 ? (
                  product.customFields.map((field, index) => (
                    field.label && field.value && (
                      <div key={index} className="description-row">
                        <span className="description-label">{field.label}</span>
                        <span className="description-value">{field.value}</span>
                      </div>
                    )
                  ))
                ) : (
                  <div className="no-description">
                    <p>No product details available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
