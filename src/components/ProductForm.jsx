import React, { useState, useEffect } from 'react';
import { validateImageFile } from '../services/imageService';
import { uploadImageFree } from '../services/freeImageHosting';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    availableTypes: '',
    availableDiameters: '',
    flipTop: '',
    applications: [],
    features: []
  });

  const [applicationsText, setApplicationsText] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        image: product.image || '',
        description: product.description || '',
        availableTypes: product.availableTypes || '',
        availableDiameters: product.availableDiameters || '',
        flipTop: product.flipTop || '',
        applications: product.applications || [],
        features: product.features || []
      });
      
      setApplicationsText(product.applications?.join(', ') || '');
      setFeaturesText(product.features?.join(', ') || '');
      setImagePreview(product.image || '');
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationsChange = (e) => {
    const value = e.target.value;
    setApplicationsText(value);
    setFormData(prev => ({
      ...prev,
      applications: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleFeaturesChange = (e) => {
    const value = e.target.value;
    setFeaturesText(value);
    setFormData(prev => ({
      ...prev,
      features: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateImageFile(file);
        setImageFile(file);
        setUploadError('');

        // Generate suggested filename
        const timestamp = Date.now();
        const fileName = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${file.name.split('.').pop()}`;
        const suggestedPath = `/images/productItems/${fileName}`;

        // Update form data with suggested path
        setFormData(prev => ({
          ...prev,
          image: suggestedPath
        }));

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);

        // Show instruction to user
        setUploadError(`After saving, please manually copy the selected image to: public${suggestedPath}`);
      } catch (error) {
        setUploadError(error.message);
        setImageFile(null);
        setImagePreview(formData.image || '');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadError('');

    try {
      // Simply submit the form data
      // The image path is already set in formData.image
      onSubmit(formData);
    } catch (error) {
      setUploadError('Failed to save product. Please try again.');
      console.error('Error saving product:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form-card">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Product Image</label>
              <div className="image-upload-container">
                <div className="upload-methods">
                  <div className="method-section">
                    <h4>Method 1: Upload File (Recommended)</h4>
                    <input
                      type="file"
                      id="imageFile"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="image-input"
                    />
                    <label htmlFor="imageFile" className="image-upload-button">
                      📁 Choose Image File
                    </label>
                    <small className="method-note">
                      Select an image file. You'll need to manually copy it to the public folder after saving.
                    </small>
                  </div>

                  <div className="method-divider">OR</div>

                  <div className="method-section">
                    <h4>Method 2: Enter Image URL</h4>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg or /images/productItems/image.png"
                      className="image-url-input"
                    />
                    <small className="method-note">
                      Use existing images from public folder or external URLs
                    </small>
                  </div>
                </div>
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <h4>Preview:</h4>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}

              {uploadError && (
                <div className={`upload-message ${uploadError.includes('copy') ? 'info' : 'error'}`}>
                  {uploadError}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Enter product description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="availableTypes">Available Types</label>
              <input
                type="text"
                id="availableTypes"
                name="availableTypes"
                value={formData.availableTypes}
                onChange={handleInputChange}
                placeholder="e.g., Tupperware, Bottles"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="availableDiameters">Available Diameters</label>
              <input
                type="text"
                id="availableDiameters"
                name="availableDiameters"
                value={formData.availableDiameters}
                onChange={handleInputChange}
                placeholder="e.g., 38 mm, 46 mm"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="flipTop">Flip Top Sizes</label>
            <input
              type="text"
              id="flipTop"
              name="flipTop"
              value={formData.flipTop}
              onChange={handleInputChange}
              placeholder="e.g., 24 mm, 60 mm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="applications">Applications (comma-separated)</label>
            <textarea
              id="applications"
              value={applicationsText}
              onChange={handleApplicationsChange}
              rows="3"
              placeholder="e.g., Tupperware containers, Food storage, Kitchen accessories"
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Features (comma-separated)</label>
            <textarea
              id="features"
              value={featuresText}
              onChange={handleFeaturesChange}
              rows="3"
              placeholder="e.g., Easy grip design, Secure closure, Durable material"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={uploading}>
              {uploading ? 'Uploading...' : (product ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
