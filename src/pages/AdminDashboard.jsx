import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { migrateJsonToFirebase } from '../utils/migrateData';
import ProductForm from '../components/ProductForm';
import ImageHostingGuide from '../components/ImageHostingGuide';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [migrating, setMigrating] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        await fetchProducts(); // Refresh the list
      } catch (error) {
        setError('Failed to delete product');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      
      setShowForm(false);
      setEditingProduct(null);
      await fetchProducts(); // Refresh the list
    } catch (error) {
      setError('Failed to save product');
      console.error('Error saving product:', error);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleMigrateData = async () => {
    if (window.confirm('This will migrate data from JSON to Firebase. Continue?')) {
      try {
        setMigrating(true);
        await migrateJsonToFirebase();
        await fetchProducts(); // Refresh the list
        alert('Data migration completed successfully!');
      } catch (error) {
        setError('Failed to migrate data');
        console.error('Migration error:', error);
      } finally {
        setMigrating(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Product Management Dashboard</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : showGuide ? (
        <div className="admin-content">
          <div className="guide-header">
            <button onClick={() => setShowGuide(false)} className="back-button">
              ← Back to Dashboard
            </button>
          </div>
          <ImageHostingGuide />
        </div>
      ) : (
        <div className="admin-content">
          <div className="admin-actions">
            <button onClick={handleAddProduct} className="add-product-button">
              + Add New Product
            </button>
            {products.length === 0 && (
              <button
                onClick={handleMigrateData}
                className="migrate-button"
                disabled={migrating}
              >
                {migrating ? 'Migrating...' : 'Migrate JSON Data'}
              </button>
            )}
            {/* <button
              onClick={() => setShowGuide(!showGuide)}
              className="guide-button"
            >
              📸 Image Hosting Guide
            </button> */}
          </div>

          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Types</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="no-products">
                      No products found. Add your first product!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image || '/placeholder-image.jpg'}
                          alt={product.name}
                          className="product-thumbnail"
                        />
                      </td>
                      <td className="product-name">{product.name}</td>
                      <td className="product-description">
                        {product.description?.substring(0, 100)}...
                      </td>
                      <td>{product.availableTypes}</td>
                      <td className="actions">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
