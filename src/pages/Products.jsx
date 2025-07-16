import { useState, useEffect } from 'react'
import './Products.css'
import { getAllProducts } from '../services/productService'
import ProductModal from '../components/ProductModal'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const fetchedProducts = await getAllProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      setError('Failed to load products')
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="products-error">
        <p>{error}</p>
        <button onClick={fetchProducts} className="retry-button">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="products">
      {/* <div className="products-header">
        <h1 className="products-title">Our Products</h1>
        <p className="products-subtitle">
          We specialize in manufacturing caps and closures for a variety of industries.
          Having a large number of injection molding machines of reputed brands, we can
          fulfill bulk orders promptly. You can visit our website to see our expanding
          portfolio of products in Gujarat and Maharashtra.
        </p>
      </div> */}

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image">
                <img src={product.image || '/placeholder-image.jpg'} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default Products
