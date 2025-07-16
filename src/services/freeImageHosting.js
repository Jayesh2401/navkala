// Free Image Hosting Solutions

// Option 1: GitHub Repository as CDN
export const uploadToGitHub = async (file, productName) => {
  // This would require GitHub API token and repository setup
  // For demo purposes, we'll simulate the process
  
  const timestamp = Date.now();
  const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
  const fileExtension = file.name.split('.').pop();
  const fullFileName = `${fileName}.${fileExtension}`;
  
  // GitHub raw URL format: https://raw.githubusercontent.com/username/repo/main/images/filename
  // You would need to set up a GitHub repository for images
  const githubUrl = `https://raw.githubusercontent.com/YOUR_USERNAME/navkala-images/main/products/${fullFileName}`;
  
  return {
    url: githubUrl,
    fileName: fullFileName,
    service: 'github'
  };
};

// Option 2: Cloudinary (Free tier: 25GB storage, 25GB bandwidth/month)
export const uploadToCloudinary = async (file, productName) => {
  const cloudName = 'YOUR_CLOUD_NAME'; // Replace with your Cloudinary cloud name
  const uploadPreset = 'YOUR_UPLOAD_PRESET'; // Replace with your upload preset
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'navkala-products');
  
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    return {
      url: data.secure_url,
      publicId: data.public_id,
      service: 'cloudinary'
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

// Option 3: ImgBB (Free tier: Unlimited images, 32MB per image)
export const uploadToImgBB = async (file, productName) => {
  const apiKey = 'YOUR_IMGBB_API_KEY'; // Get from https://api.imgbb.com/
  
  const formData = new FormData();
  formData.append('image', file);
  formData.append('key', apiKey);
  formData.append('name', productName.toLowerCase().replace(/\s+/g, '-'));
  
  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        url: data.data.url,
        deleteUrl: data.data.delete_url,
        service: 'imgbb'
      };
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw error;
  }
};

// Option 4: Simple Public Folder Approach (for development/small scale)
export const saveToPublicFolder = async (file, productName) => {
  // This is a client-side simulation
  // In reality, you'd need a backend endpoint to save files
  
  const timestamp = Date.now();
  const fileName = `${productName.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`;
  const fileExtension = file.name.split('.').pop();
  const fullFileName = `${fileName}.${fileExtension}`;
  
  // For development, we'll use base64 and suggest manual upload
  const base64 = await fileToBase64(file);
  
  return {
    url: `/images/productItems/${fullFileName}`,
    base64: base64,
    fileName: fullFileName,
    service: 'public',
    instruction: `Please manually save this image as '${fullFileName}' in the public/images/productItems/ folder`
  };
};

// Helper function
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Main upload function that tries different services
export const uploadImageFree = async (file, productName, preferredService = 'public') => {
  try {
    switch (preferredService) {
      case 'github':
        return await uploadToGitHub(file, productName);
      case 'cloudinary':
        return await uploadToCloudinary(file, productName);
      case 'imgbb':
        return await uploadToImgBB(file, productName);
      case 'public':
      default:
        return await saveToPublicFolder(file, productName);
    }
  } catch (error) {
    console.error('Upload failed, falling back to public folder:', error);
    return await saveToPublicFolder(file, productName);
  }
};
