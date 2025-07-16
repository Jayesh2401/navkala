import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'navkalaProducts';

// Get all products
export const getAllProducts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, productId));
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Initialize with sample data (run once)
export const initializeSampleData = async () => {
  try {
    // Check if data already exists
    const existingProducts = await getAllProducts();
    if (existingProducts.length > 0) {
      console.log('Sample data already exists');
      return;
    }

    // Sample products data
    const sampleProducts = [
      {
        name: "Butterfly Handle Caps",
        image: "/images/productItems/butterfly-handle-caps.png",
        description: "High-quality butterfly handle caps designed for easy grip and secure closure. Perfect for various container applications.",
        availableTypes: "Tupperware",
        availableDiameters: "38 mm, 46 mm",
        flipTop: "24 mm, 60 mm",
        applications: ["Tupperware containers", "Food storage", "Kitchen accessories"],
        features: ["Easy grip design", "Secure closure", "Durable material", "Multiple sizes available"]
      },
      {
        name: "Flip Top Caps",
        image: "/images/productItems/flip-top-caps.png",
        description: "Convenient flip-top caps for easy access and secure sealing. Ideal for bottles and containers requiring frequent opening.",
        availableTypes: "Bottles, Containers",
        availableDiameters: "28 mm, 32 mm",
        flipTop: "20 mm, 24 mm",
        applications: ["Beverage bottles", "Cosmetic containers", "Pharmaceutical bottles"],
        features: ["One-handed operation", "Leak-proof seal", "Smooth flip mechanism", "Tamper-evident design"]
      }
      // Add more sample products as needed
    ];

    // Add each sample product
    for (const product of sampleProducts) {
      await addProduct(product);
    }

    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
    throw error;
  }
};
