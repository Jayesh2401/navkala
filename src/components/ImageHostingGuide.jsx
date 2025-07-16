import React, { useState } from 'react';
import './ImageHostingGuide.css';

const ImageHostingGuide = () => {
  const [activeTab, setActiveTab] = useState('public');

  const hostingOptions = {
    public: {
      title: 'Public Folder (Current)',
      description: 'Store images in your project\'s public folder',
      steps: [
        'Select an image file in the product form',
        'Save the product (it will show the suggested path)',
        'Manually copy the image file to public/images/productItems/',
        'Rename the file to match the suggested name',
        'The image will now load correctly'
      ],
      pros: ['Simple setup', 'Fast loading', 'No external dependencies', 'Full control'],
      cons: ['Manual file management', 'Limited by server storage'],
      cost: 'Free (uses your hosting storage)'
    },
    github: {
      title: 'GitHub as CDN',
      description: 'Use a GitHub repository to host images for free',
      steps: [
        'Create a new GitHub repository (e.g., "navkala-images")',
        'Create a folder structure: images/products/',
        'Upload images to this folder',
        'Use raw GitHub URLs in your product forms',
        'Example: https://raw.githubusercontent.com/username/navkala-images/main/images/products/image.jpg'
      ],
      pros: ['Completely free', 'Reliable CDN', 'Version control', 'Global distribution'],
      cons: ['Manual upload process', 'Requires GitHub account'],
      cost: 'Free (unlimited public repositories)'
    },
    cloudinary: {
      title: 'Cloudinary',
      description: 'Professional image hosting with automatic optimization',
      steps: [
        'Sign up at cloudinary.com',
        'Get your cloud name and upload preset',
        'Upload images through their dashboard or API',
        'Use the provided URLs in your product forms',
        'Images are automatically optimized'
      ],
      pros: ['Automatic optimization', 'Easy integration', 'Image transformations', 'CDN'],
      cons: ['Limited free tier', 'Requires account setup'],
      cost: 'Free tier: 25GB storage, 25GB bandwidth/month'
    },
    imgbb: {
      title: 'ImgBB',
      description: 'Simple image hosting service',
      steps: [
        'Sign up at imgbb.com',
        'Get your API key',
        'Upload images through their website or API',
        'Use the provided URLs in your product forms',
        'Images are hosted permanently'
      ],
      pros: ['Simple to use', 'No bandwidth limits', 'Permanent hosting'],
      cons: ['32MB per image limit', 'Requires account'],
      cost: 'Free (unlimited images up to 32MB each)'
    },
    drive: {
      title: 'Google Drive',
      description: 'Use Google Drive as image hosting',
      steps: [
        'Upload images to Google Drive',
        'Right-click image → Get link → Change to "Anyone with the link"',
        'Copy the file ID from the URL',
        'Use format: https://drive.google.com/uc?id=FILE_ID',
        'Paste this URL in your product forms'
      ],
      pros: ['15GB free storage', 'Easy to use', 'Familiar interface'],
      cons: ['Not a proper CDN', 'May have access restrictions', 'Slower loading'],
      cost: 'Free: 15GB storage'
    }
  };

  return (
    <div className="image-hosting-guide">
      <h2>📸 Free Image Hosting Options</h2>
      <p className="guide-intro">
        Choose the best free image hosting solution for your needs. Each option has different trade-offs.
      </p>

      <div className="hosting-tabs">
        {Object.keys(hostingOptions).map(key => (
          <button
            key={key}
            className={`tab-button ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {hostingOptions[key].title}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {Object.keys(hostingOptions).map(key => (
          <div
            key={key}
            className={`tab-panel ${activeTab === key ? 'active' : ''}`}
          >
            <div className="option-header">
              <h3>{hostingOptions[key].title}</h3>
              <p className="option-description">{hostingOptions[key].description}</p>
              <div className="cost-badge">{hostingOptions[key].cost}</div>
            </div>

            <div className="option-content">
              <div className="steps-section">
                <h4>📋 Setup Steps:</h4>
                <ol>
                  {hostingOptions[key].steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="pros-cons-section">
                <div className="pros">
                  <h4>✅ Pros:</h4>
                  <ul>
                    {hostingOptions[key].pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="cons">
                  <h4>❌ Cons:</h4>
                  <ul>
                    {hostingOptions[key].cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendation">
        <h3>💡 Recommendations:</h3>
        <div className="recommendation-cards">
          <div className="rec-card">
            <h4>For Development/Testing</h4>
            <p>Use <strong>Public Folder</strong> - Simple and fast</p>
          </div>
          <div className="rec-card">
            <h4>For Small Business</h4>
            <p>Use <strong>GitHub CDN</strong> - Free and reliable</p>
          </div>
          <div className="rec-card">
            <h4>For Professional Use</h4>
            <p>Use <strong>Cloudinary</strong> - Optimized and feature-rich</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageHostingGuide;
