import { addProduct } from '../services/productService';
import productsData from '../data/products.json';

export const migrateJsonToFirebase = async () => {
  try {
    console.log('Starting data migration...');

    for (const product of productsData) {
      // Remove the id field since Firebase will generate its own
      const { id, ...productData } = product;

      // Check if product already has customFields (new format)
      if (productData.customFields && Array.isArray(productData.customFields)) {
        // Product is already in new format, just migrate as-is
        const migratedProduct = {
          name: productData.name,
          image: productData.image,
          description: productData.description,
          customFields: productData.customFields
        };

        await addProduct(migratedProduct);
        console.log(`Migrated (new format): ${product.name}`);
      } else {
        // Product is in old format, convert to new format
        const { availableTypes, availableDiameters, flipTop, applications, features, ...cleanData } = productData;

        // Convert old fixed fields to custom fields
        const customFields = [];

        if (availableTypes) {
          customFields.push({ label: 'Available Types', value: availableTypes });
        }

        if (availableDiameters) {
          customFields.push({ label: 'Available Diameters', value: availableDiameters });
        }

        if (flipTop) {
          customFields.push({ label: 'Flip Top', value: flipTop });
        }

        // Create clean product data with only essential fields
        const migratedProduct = {
          name: cleanData.name,
          image: cleanData.image,
          description: cleanData.description,
          customFields: customFields
        };

        await addProduct(migratedProduct);
        console.log(`Migrated (converted): ${product.name}`);
      }
    }

    console.log('Data migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
};
