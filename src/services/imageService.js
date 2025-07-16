// Simple image handling without Firebase Storage
// Using public folder or external CDN URLs

// Convert file to base64 for preview
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Upload to public folder (for development) or external service
export const uploadImage = async (file, productName) => {
  try {
    // For now, we'll use a placeholder approach
    // In production, you would upload to your preferred service

    // Create a unique filename
    const timestamp = Date.now();
    const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
    const fileExtension = file.name.split('.').pop();
    const fullFileName = `${fileName}.${fileExtension}`;

    // Convert to base64 for immediate preview
    const base64 = await fileToBase64(file);

    // Return a structure that can be used
    return {
      url: base64, // For immediate preview
      fileName: fullFileName,
      file: file, // Keep original file for actual upload
      publicPath: `/images/productItems/${fullFileName}` // Future public path
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};

// For external CDN services like GitHub, Cloudinary, etc.
export const uploadToExternalCDN = async (file, productName) => {
  // This is where you'd implement upload to your chosen service
  // For now, return the public folder path
  const timestamp = Date.now();
  const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
  const fileExtension = file.name.split('.').pop();
  const fullFileName = `${fileName}.${fileExtension}`;

  return `/images/productItems/${fullFileName}`;
};

// Delete image (placeholder)
export const deleteImage = async (imagePath) => {
  try {
    // Implement deletion logic based on your chosen service
    console.log('Delete image:', imagePath);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Validate image file
export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please select a valid image file (JPEG, PNG, or WebP)');
  }
  
  if (file.size > maxSize) {
    throw new Error('Image size should be less than 5MB');
  }
  
  return true;
};
