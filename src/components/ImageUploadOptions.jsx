import React, { useState } from 'react';
import './ImageUploadOptions.css';

const ImageUploadOptions = ({ onImageSelect, currentImage }) => {
  const [selectedOption, setSelectedOption] = useState('public');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentImage || '');
  const [manualUrl, setManualUrl] = useState(currentImage || '');

  const hostingOptions = [
    {
      id: 'public',
      name: 'Public Folder',
      description: 'Store images in public/images/productItems/',
      pros: ['Simple', 'Fast loading', 'No external dependencies'],
      cons: ['Manual file management', 'Limited to your server storage']
    },
    {
      id: 'github',
      name: 'GitHub CDN',
      description: 'Use GitHub repository as free CDN',
      pros: ['Completely free', 'Reliable', 'Version control'],
      cons: ['Requires GitHub setup', 'Manual upload process']
    },
    {
      id: 'cloudinary',
      name: 'Cloudinary',
      description: 'Free tier: 25GB storage, 25GB bandwidth/month',
      pros: ['Automatic optimization', 'Easy integration', 'Good free tier'],
      cons: ['Requires account setup', 'Limited free tier']
    },
    {
      id: 'manual',
      name: 'Manual URL',
      description: 'Enter image URL from any hosting service',
      pros: ['Use any hosting service', 'Full control', 'Flexible'],
      cons: ['Manual process', 'Need to manage hosting yourself']
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target.result;
        setImagePreview(preview);
        
        // Generate suggested filename and path
        const timestamp = Date.now();
        const fileName = `product-${timestamp}.${file.name.split('.').pop()}`;
        const publicPath = `/images/productItems/${fileName}`;
        
        onImageSelect({
          file: file,
          preview: preview,
          suggestedPath: publicPath,
          fileName: fileName,
          method: selectedOption
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setManualUrl(url);
    setImagePreview(url);
    
    onImageSelect({
      url: url,
      preview: url,
      method: 'manual'
    });
  };

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
    setImageFile(null);
    setImagePreview(currentImage || '');
    setManualUrl(currentImage || '');
  };

  return (
    <div className="image-upload-options">
      <h3>Choose Image Hosting Method</h3>
      
      <div className="hosting-options">
        {hostingOptions.map(option => (
          <div 
            key={option.id}
            className={`option-card ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionChange(option.id)}
          >
            <div className="option-header">
              <input
                type="radio"
                name="hosting"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => handleOptionChange(option.id)}
              />
              <h4>{option.name}</h4>
            </div>
            <p className="option-description">{option.description}</p>
            <div className="pros-cons">
              <div className="pros">
                <strong>Pros:</strong>
                <ul>
                  {option.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons">
                <strong>Cons:</strong>
                <ul>
                  {option.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="upload-section">
        {selectedOption === 'manual' ? (
          <div className="manual-url-input">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="url"
              id="imageUrl"
              value={manualUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        ) : (
          <div className="file-upload">
            <label htmlFor="imageFile">Select Image File:</label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleFileChange}
            />
            {selectedOption === 'public' && imageFile && (
              <div className="public-folder-instruction">
                <p><strong>Instructions:</strong></p>
                <p>After saving the product, manually copy the selected image to:</p>
                <code>public/images/productItems/{imageFile.name}</code>
              </div>
            )}
          </div>
        )}

        {imagePreview && (
          <div className="image-preview">
            <h4>Preview:</h4>
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadOptions;
