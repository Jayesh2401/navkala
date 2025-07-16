import { addProduct } from '../services/productService';
import productsData from '../data/products.json';

export const migrateJsonToFirebase = async () => {
  try {
    console.log('Starting data migration...');
    
    for (const product of productsData) {
      // Remove the id field since Firebase will generate its own
      const { id, ...productData } = product;
      
      await addProduct(productData);
      console.log(`Migrated: ${product.name}`);
    }
    
    console.log('Data migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};
